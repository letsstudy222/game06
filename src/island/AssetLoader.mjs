export class AssetLoader {
  constructor(manifestURL = "assets/production/manifest.json") {
    this.manifestURL = manifestURL;
    this.images = new Map();
    this.manifest = null;
  }
  async load(onProgress = () => {}) {
    const response = await fetch(this.manifestURL);
    if (!response.ok) throw new Error("Thiếu manifest asset");
    this.manifest = await response.json();
    const definitions = [
      ["world", this.manifest.environment.world],
      ["props", this.manifest.environment.props],
      ["phoenix", this.manifest.phoenix.image],
    ];
    let loaded = 0;
    await Promise.all(
      definitions.map(async ([id, url]) => {
        const image = new Image();
        image.src = url;
        try {
          await image.decode();
        } catch {
          throw new Error(`Không tải được ${url}`);
        }
        this.images.set(id, image);
        onProgress(++loaded, definitions.length);
      }),
    );
    const world = this.get("world"),
      hero = this.get("phoenix");
    if (
      world.naturalWidth !== this.manifest.environment.worldSize[0] ||
      world.naturalHeight !== this.manifest.environment.worldSize[1] ||
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
