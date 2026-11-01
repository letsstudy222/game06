# Contract manifest được hỗ trợ

Code thực: [validate-assets.cjs](../../scripts/validate-assets.cjs). Hai nhánh riêng: adapter environment.kind=tilemap + phoenix hiện hữu; hoặc assetContractVersion=1 + assets array. Generic version khác bị INVALID_MANIFEST, không suy từ content revision rằng có thể đổi schema. Các đối tượng species/form/stage/ability không được đăng ký ở đây.

| Trường contract1 | Quy tắc thực |
| --- | --- |
| assets[].id | Chuỗi bắt đầu chữ, sau đó chữ/số/underscore/dot/hyphen; unique trong manifest |
| type | sprite-atlas, tileset, environment-image, effects-image, decoration; PNG-only hiện tại |
| path | Source path gốc dự án từ assets/, không URL/query/prefix deployment |
| required | Boolean tùy chọn, mặc định true; chỉ thiếu file với false mới warning |
| width/height | Nếu khai báo: nguyên dương và khớp PNG; không buộc mọi ảnh phải96/32 |
| sha256 | Nếu khai báo:64hexlowercase khớp nội dung; mismatch là lỗi integrity |
| frameWidth/frameHeight | Cùng khai báo, nguyên dương, chia hết ảnh; không bắt ảnh môi trường dùng grid |
| frames | Array; sprite-atlas cần ít nhất một frame có id và rect; frameid unique trong asset |
| clips | Array tùy chọn, clipid unique trong asset, refs chỉ tới frames của asset |
| requiredClips | Array clipid bắt buộc theo milestone; thiếu fail |
| requiredFrameMetadata | Array anchor/bounds cần có trên mọi frame; thiếu fail, không auto metadata giả |

Frame và clip có namespace riêng; asset ID khác scene/species/form/stage/ability ID dù cùng cách viết. ID chỉ đảm bảo tính hợp lệ tham chiếu asset, không chứng nhận loài canon hoặc quyền sử dụng. Frame/clip IDs có thể biểu đạt idle/move/attack/defend/hurt/incapacitated/interact/evolution theo content được duyệt, không bắt mọi loài có mọi clip.

Fixture trong tests tạo manifest trong bộ nhớ và copy atlas Phượng vào thư mục test tạm dưới id fixture.actor. Không production asset mới, không tệp Quy rỗng. Có thể dùng sha256 làm expected digest, nhưng revision/content/schema không liên quan identity reward. Validator không có authority XP/quest/save.

Source/provenance metadata d.source của props hiện hữu chỉ mô tả crop từ master; không coi file source basename là deployed URL. Không validate quyền pháp lý hoặc phê duyệt anatomy. Optional field không đồng nghĩa optional asset; required actor phải được đánh dấu required theo scene contract khi integration sau này. validateManifest PASS chỉ là contract/file metadata, không scene S0 đã chơi được.
