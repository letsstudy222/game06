# Joystick liên tục và nút action mobile

Code [InputDevices](../../src/island/InputDevices.mjs): VirtualJoystick và VirtualActionButton dùng SemanticInput; không sở hữu velocity, cooldown, target selection hoặc damage.

Joystick dùng một pointer owner; pointer khác không giành quyền hoặc reset pointer đầu. Vector liên tục theo góc, magnitude tăng từ dead zone đến 1, không lượng tử tám hướng. Góc animation có thể dùng direction8 riêng. deadZone và radiusFactor là tham số cấu hình; giá trị mặc định 0.16/0.32 chỉ là engineering defaults có thể tuning, không canon Quy. Dùng CSS bounds thực, không nhân DPR. Knob tùy chọn chỉ là presentation.

Component đặt touch-action:none trên surface của mình, preventDefault khi đang điều khiển; dispose phục hồi style. Capture/release/cancel/lostcapture và resize/rotation/blur reset pointer và vector. BrowserInput owner clear toàn bộ sources khi visibility/context đổi. Các component phải nằm trong scope owner đó hoặc caller cung cấp clear lifecycle tương đương; không có listener toàn app ẩn trong SemanticInput.

VirtualActionButton phát held/edge theo từng pointer và hỗ trợ click detail=0 từ bàn phím/assistive activation. Nút attack bên phải phát basic_attack; nút dodge có thể dựng riêng nhưng không có gameplay dodge. Multi-touch joystick + attack không ghi đè source nhau. Interaction menu thường không đi qua nút action này.

Harness bố trí joystick trái và attack/dodge phải, touch surfaces kích thước rõ. Production Dawn UI/joystick và UISettings giữ nguyên. Chưa thêm control-setting screen, sản phẩm UI Quy hoặc lưu remap. Khi tích hợp có thể lấy size/layout từ configuration owner hiện hữu, không từ gameplay save.

Assisted targeting là hướng **CONFIRMED** cho mobile: consumer tương lai chuyển basic_attack intent qua guard [aim/assist](TASK30_AIMING_AND_TARGET_ASSIST.md). Task 30 chưa tự tìm mục tiêu; nếu không có proposal hợp lệ thì giữ fallback aim, không bảo đảm hit. Không tuyên bố đã kiểm thiết bị di động thật; browser touch là emulation.
