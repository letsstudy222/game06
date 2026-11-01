# Aim độc lập và guard target proposal

[screenToWorld](../../src/island/RenderPrimitives.mjs) dùng pointer client coordinates, Canvas CSS rect, backing width/height và camera snap. Công thức local logical = (client−rect origin)×backing/CSS, world = local+round(camera). Không nhân DPR lần hai; CSS offset/scale đã phản ánh tọa độ client. Không thêm projection/isometric/camera model mới. Canvas hiện hữu không border/padding; surface tương lai có border/padding phải cung cấp content rect đúng.

BrowserInput sample tính lại aim từ pointer cuối và camera/actor origin hiện tại, nên pointer đứng yên vẫn phản ánh camera hoặc actor di chuyển. Vector zero gần origin giữ aim hợp lệ cuối; pointer rời Canvas ngừng cập nhật và giữ hướng đó. Chỉ mouse/pen trên Canvas cấp manual aim, touch control không tự được coi là crosshair. Giá trị không hữu hạn hoặc geometry Canvas zero bị từ chối có diagnostic.

Move, aim và animation facing khác nhau. Core cung cấp hai category direction8 riêng; creature controller tương lai chọn chính sách animation. Không tạo frame chéo, mirror loài mới, sprite Quy hoặc ghi đè facing/attack Phượng.

`assistedAim({origin,fallbackAim,target,range})` ở [InputIntents](../../src/island/InputIntents.mjs) chỉ kiểm **một proposal** do authority bên ngoài cung cấp; không quét scene, nearest-target, lock-on hoặc target priority engine. Chỉ chấp nhận targetId, vị trí hữu hạn, hostile=true, attackable=true, invulnerable=false, occluded=false, lineOfSight=true và khoảng cách dương trong range do caller cấp. Cờ không rõ không được coi là hợp lệ.

Proposal thiếu/không hợp lệ trả targetId=null, assisted=false và hướng fallback chuẩn hóa; fallback zero dùng hướng xuống để luôn hữu hạn. Không đổi hướng thành guaranteed hit hoặc gây homing damage. Future combat phải cấp range và revalidate eligibility/LoS tại thời điểm action resolution; guard input không là combat authority. Range/priority/assist strength/smoothing production còn UNRESOLVED. Test fixtures chỉ kiểm guard và fallback, không chứng nhận target-acquisition gameplay đã có.
