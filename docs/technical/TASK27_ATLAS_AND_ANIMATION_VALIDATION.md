# Kiểm tra atlas, frame và clip

Triển khai trong validateManifest tại [validator](../../scripts/validate-assets.cjs); [tests](../../tests/assets.test.cjs) kiểm frame/clip/anchors. Đọc PNG signature/IHDR và width/height trực tiếp; không dependency decode nặng hoặc request mạng. **Không** full pixel decode/CRC/IDAT integrity validator: ảnh header hợp lệ nhưng stream hỏng có thể cần runtime Image.decode phát hiện. Unit ảnh cũ và browser decode vẫn cần giữ.

Rect là [x,y,width,height], số nguyên, x/y không âm, size dương và trong PNG. Anchor là[x,y] hữu hạn trong frame, cho phép biên. Visual bounds là[left,top,right,bottom], hữu hạn với diện tích dương và trong frame; không phải collision/hurtbox. RequiredFrameMetadata bật kiểm bắt buộc anchor/bounds; nếu không bật, thiếu field là MISSING_OPTIONAL_METADATA warning, không tự đặt gốc ảnh làm anchor chuẩn.

Clip cần frameIds array không rỗng, từng ref tồn tại, durationMs hữu hạn dương; loop nếu có phải boolean. Không diễn giải duration thành damage window hoặc phê duyệt FPS. RequiredClips chỉ định những clip thực sự cần cho milestone. Clip optional không tồn tại không lỗi nếu không required; clip đã khai báo mà ref/timing sai vẫn fail, không che bằng optional.

## Adapter Phượng và terrain hiện hữu

- Terrain tileSize/columns nguyên dương, tilesSize khớp PNG; width=columns×tileSize, height chia hết tileSize; từng tile frame index trong atlas.
- Props id unique, rect/origin hợp lệ; bounds nếu có được kiểm. Shadow metadata nếu có cần shadows image và rect/origin hợp lệ.
- Phượng frameSize/columns/posesPerDirection nguyên dương; width/height grouping, row mỗi hướng, origin, mirror boolean và bounds count được kiểm. Bốn hướng logic up/down/left/right cần vì renderer hiện tại dùng chúng; đây không là chuẩn bắt buộc cho Quy.
- PHOENIX_ANIMATIONS bốn logical frame/state không là tọa độ bốn pose atlas. Renderer thực chọn hai pose trên ba row; validator không reinterpret state row0–5 thành sáu raw atlas rows hoặc thêm clip giả. File AnimationController không đổi.

Production Quy cần approved anatomy/directions/markers sauTask34. Schema có thể biểu đạt clip khác nhau theo stage nhưng chưa bind stage catalog. FrameSize96 của Phượng và tile32 chỉ là dữ kiện hiện hữu. Không đổi ảnh để ép đạt chuẩn mới.
