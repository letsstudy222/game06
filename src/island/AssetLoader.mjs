export class AssetLoader {
  constructor(manifestURL = "assets/production/manifest.json") {
    this.manifestURL = manifestURL;
    this.images = new Map();
    this.manifest = null;
  }
  async load(onProgress = () => {}) {
    const revision = new URL(import.meta.url).searchParams.get("v");
    const versioned = (url) => {
      const result = new URL(url, document.baseURI);
      if (revision) result.searchParams.set("v", revision);
      return result.href;
    };
    const response = await fetch(versioned(this.manifestURL));
    if (!response.ok) throw new Error("Thiếu manifest asset");
    this.manifest = await response.json();
    const definitions = [
      ["terrain", this.manifest.environment.tiles],
      ["props", this.manifest.environment.props],
      ["phoenix", this.manifest.phoenix.image],
    ];
    let loaded = 0;
    await Promise.all(
      definitions.map(async ([id, url]) => {
        const image = new Image();
        image.src = versioned(url);
        try {
          await image.decode();
        } catch {
          throw new Error(`Không tải được ${url}`);
        }
        this.images.set(id, image);
        onProgress(++loaded, definitions.length);
      }),
    );
    const terrain = this.get("terrain"),
      hero = this.get("phoenix");
    if (
      terrain.naturalWidth !== this.manifest.environment.tilesSize[0] ||
      terrain.naturalHeight !== this.manifest.environment.tilesSize[1] ||
      hero.naturalWidth !==
        this.manifest.phoenix.frameSize * this.manifest.phoenix.columns
    )
      throw new Error("Kích thước atlas không khớp metadata");
    return this;
  }
  get(id) {
    const image = this.images.get(id);
    if (!image) throw new Error(`Chưa có asset ${id}`);
    return image;
  }
}
