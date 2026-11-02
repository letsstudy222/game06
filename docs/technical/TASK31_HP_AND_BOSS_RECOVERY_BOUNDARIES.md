# Checkpoint recovery không tự chốt HP hoặc boss policy

**CONFIRMED Task 31:** rời boss/trạng thái nguy hiểm thì resume từ safe checkpoint đã commit trước đó, không mặc định mid-boss pose. Implementation từ chối COMBAT_UNSAFE/transition save và load active checkpoint đã validate; việc apply placement vào actor production còn DEFERRED.

Không serialize GameState.snapshot hoặc PlayerPhoenix object. Chưa đăng ký production combat snapshot/HP fields. Fixture không có HP, invulnerability, status timer hoặc boss state; do đó load/recover không thể được diễn giải là full heal, cleanse, free retry hoặc i-frame.

Các quyết định vẫn **UNRESOLVED/PROPOSED**: HP thuộc player hay per-form; HP khi checkpoint respawn; defeat penalty/EXP loss; retry resource cost; status continuation; emergency form transfer; vị trí checkpoint và thời điểm commit boss result. User chưa duyệt chúng; Task 31 không tự chọn.

Theo [boss loadout lock](../loadout/BOSS_LOADOUT_LOCK.md), active-form incapacitation khác total encounter defeat; boss lock membership khác switch giữa equipped forms đủ điều kiện; dưới ba slot occupied vẫn hợp lệ. Storage snapshot không đổi các quy tắc hoặc finalize emergency transfer. Input dodge Task 30 không grant immunity khi load.

Durable completed progression không được tự xóa vì đang ở boss. Scene/domain owners tương lai phải cung cấp write-set/checkpoint reference nhất quán theo policy đã duyệt; nếu chưa xác định atomic boundary của reward/quest/boss completion thì không bật live integration. Mở tab lại không tự grant boss rewards hoặc diễn giải animation từng hiển thị thành completion.

Backup recovery cũ cần xác nhận vì có thể mất thế hệ mới không đọc được; normal resume safe active không có thao tác rollback. Khi cả active/backup mất hoặc lỗi, báo không thể phục hồi, không tạo progression thay thế. Phượng hiện hữu vẫn dùng recovery/HP prototype cũ hoàn toàn không sửa.
