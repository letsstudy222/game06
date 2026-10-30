# Phạm vi sản xuất

Đọc cùng [tầm nhìn](GAME_VISION.md) và [kiểm kê kỹ thuật](REPOSITORY_AUDIT.md). Task 01 chỉ thiết lập tài liệu, không hiện thực hóa các hệ dưới đây.

## Các mốc và ranh giới

| Mốc | Phạm vi | Trạng thái |
| --- | --- | --- |
| Nền đang có | Đảo Bình Minh 40×28, Phoenix, input/combat/HP/shrine, camera, UI và môi trường đã duyệt; mẫu đối chiếu riêng | Có source và artifact local; không phải Chương I mới |
| Vertical slice sản xuất đầu tiên | Một phần nhỏ, được polish của Chương I — Quy tại Vực Hải Uyên | Mục tiêu xác nhận; số phòng, thời lượng, nhân sự và lịch chưa chốt |
| Cung truyện đầu | Quy → Phượng → Long → Ly, khôi phục bốn hệ và tái kích hoạt Tinh Môn (Task 02) | Phạm vi nội dung ban đầu; không triển khai đồng loạt |
| Mở rộng | Hành trình tới hành tinh/môi trường khác qua cổng | Ngoài sản xuất ban đầu; chưa có cam kết hệ thống hoặc lịch |

Đảo Bình Minh là tên/runtime ID hiện hữu (`dawn`). Đảo Nhật Diệm là bối cảnh Chương II trong tầm nhìn mới. **Chưa xác nhận chúng là cùng đảo hoặc quan hệ địa lý cụ thể**; không đổi tên map hay diễn giải prototype thành canon hoàn chỉnh.

## Vertical slice Chương I

Cần chứng minh cảm giác hóa thân Quy, di chuyển dưới nước có phản hồi tốt, một đoạn khám phá có bản sắc, chiến đấu đọc được và một tương tác môi trường gắn với khôi phục năng lượng. Slice chỉ thể hiện một phần chương; không phải toàn bộ Vực Hải Uyên hoặc toàn bộ kết thúc chương.

**PROPOSED — tiêu chí cắt lát để chốt ở nhiệm vụ sau:** một tuyến khám phá ngắn có điểm bắt đầu/kết thúc rõ; ít nội dung nhưng asset hoàn chỉnh; một cơ hội đọc dòng năng lượng; một tình huống chiến đấu đại diện; một thay đổi môi trường có thể kiểm chứng và một dấu vết ký ức chưa giải đáp đại bí ẩn. Không coi số lượng encounter, boss, sinh vật phụ hoặc độ dài là đã duyệt. Slice không bắt buộc ba dạng chơi được ngay; cần kế hoạch kiểm chứng bộ ba về sau mà không biến test placeholder thành sinh vật canon.

Trước khi làm slice: có tham chiếu Quy, quy cách sprite/animation, giới hạn di chuyển dưới nước, ngân sách nội dung, định nghĩa thành công và quyết định về checkpoint/save tối thiểu. Chưa có asset Quy trong checkout, nên chưa thể tuyên bố slice sẵn sàng sản xuất hình ảnh.

## Trong phạm vi tầm nhìn bốn chương

- Điều khiển trực tiếp, di chuyển/né hoặc cơ động, đòn đánh phản hồi tốt, kỹ năng chủ động, telegraph rõ, tương tác nguyên tố, XP và loot có ý nghĩa.
- Cộng hưởng và bộ sưu tập; ba dạng trang bị, đổi dạng và khóa thành phần khi boss; tiến trình riêng từng sinh vật.
- Bốn hệ sinh thái có nhận diện hình ảnh, điều kiện traversal, loài bản địa/ảnh hưởng ngoại lai, tàn tích/lịch sử, thách thức và lý do tồn tại về truyện.
- Thay đổi bền vững ở các phần môi trường được chọn; có thể tiếp tục điều chỉnh qua quest. Không bất ngờ khóa vĩnh viễn khả năng hoàn tất bộ sưu tập.
- Tác động liên vùng: việc thức tỉnh linh thú có thể thay đổi hệ sinh thái đã thăm.
- Dạng song nguyên tố cần giải thích sinh học/môi trường, không chỉ đổi màu. Không bắt mọi sinh vật phải playable.

Các tính năng này là hướng sản xuất, không phải cam kết hoàn tất trong Task 02 hoặc đã triển khai. Thiết kế kinh tế loot/XP, lưu trạng thái, enemy AI và quest vẫn cần nhiệm vụ riêng.

## Ngoài phạm vi

Task 01 không thêm gameplay, sinh vật, hình ảnh, UI, engine hay thay cấu trúc ứng dụng. Không generate art, đổi package/lockfile, xóa legacy hoặc sửa save hiện có. Không tiến hành Task 02.

Ngoài phạm vi sản xuất ban đầu: du hành hành tinh khác. Multiplayer/MMO, monetization, hệ farming và các tính năng không được nêu chưa được phê duyệt; không suy diễn chúng từ ví dụ game tham khảo. Không đặt thêm lục địa, phe phái, boss hoặc loài thành canon.

## Thứ tự phát triển

1. Nền kỹ thuật ổn định.
2. Asset nhân vật/môi trường đạt chất lượng.
3. Di chuyển phản hồi tốt.
4. Chiến đấu thời gian thực thú vị.
5. Khám phá và tương tác môi trường.
6. Tiến trình sinh vật và cộng hưởng.
7. Truyện và quest.
8. Một chương được polish.
9. Mở sang các chương sau.

Không dùng thứ tự này để bỏ qua thiết kế phụ thuộc hoặc bảo tồn bản chơi hiện hữu. Không đặt lịch và số lượng nội dung khi chưa có ước lượng nguồn lực.

## Ranh giới nội dung và nghiệm thu

Chỉ thêm asset thực sự cần cho slice đã chốt. Concept, thiết kế được duyệt, sprite kỹ thuật và animation đã thử là các trạng thái riêng. Artwork được duyệt không tự trở thành sprite hoàn chỉnh; một bộ pose không tương đương toàn bộ clip hành động. Dùng [đăng ký asset](ASSET_REFERENCE_REGISTER.md) để ghi thiếu hụt thay vì lấp bằng tuyên bố hoàn thành.

Cắt lát cần được chơi thử trên browser với kiểm tra chức năng; mobile giả lập và thiết bị thật phải báo riêng. Khả năng Windows cần bằng chứng đóng gói/chạy riêng trước khi nhận là hỗ trợ phát hành.
