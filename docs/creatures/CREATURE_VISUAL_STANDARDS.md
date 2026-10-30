# Tiêu chuẩn thị giác và silhouette

**Task12 — PROPOSED:** tiêu chuẩn thiết kế/sản xuất để đánh giá, không gameplay hoặc asset đã hoàn thành. Baseline `b610b56`, ngày 31/10/2026 Asia/Saigon. [Decisions](TASK12_DECISIONS.md) phân biệt CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED.

## Pixel-art contract — B12-P03

| Mục | Hướng dẫn đề xuất |
| --- | --- |
| Pixel density | So với tile 32 và scale gameplay thật, cluster có mật độ hợp lý; không lấy bản ý tưởng 1254 px làm sprite final; không bắt loài 96 px. |
| Pixel clusters | Nhóm pixel phục vụ plane/giải phẫu; loại noise/jaggies tùy tiện, không blur/auto smooth để che lỗi. |
| Outline | Biên rõ trên nền sáng/tối, độ dày có chủ đích, chỗ overlap đọc được; không blackoutline áp mọi vật liệu. |
| Shading/light | Ramp sáng tối gọn theo planes/nguồn sáng thống nhất scene; ánh nguyên tố riêng không đảo giải phẫu. |
| Palette | Họ màu hòa art hiện hữu, contrast mặt/core/phần phụ; không áp cùng palette count cho mọi creature. |
| Materials | Shell/chitin/lông vũ/màng/leaf/Kim khác cluster và high light; kim loại vật lý không tự element Metal. |
| Anatomy | Sốchi/khớp/đầu/đuôi nhất quán mọi hướng và phase; không mất chân trong clouds/FX. |
| Environmental contrast | Thử silhouette/grayscale/màu trên nền underwater/basalt/cloud/forest theo vùng, không chỉ trắng trống. |
| Transparency | PNG alpha theo mục đích; cơ thể hard edge ưu tiên alpha rõ, translucent màng/FX cần rule riêng; không opaque rectangle/gutter bleed. |
| Orientation | Named directions/pose có manifest, mirror chỉ khi giải phẫu và handedness cho phép; không flip asymmetric wound/weapon ngầm. |
| Animation readability | Anticipation/contact/recovery/turning có cue cùng geometry; windup đủ đọc, values cần playback đánh giá. |
| Effect separation | Body frames tách FX/nguồn overlay/envelope; tắtFX vẫn nhận species/đầu/chi, FX không tự hitbox. |

## Silhouette rubric — B12-P02, chủ quan có cấu trúc

Mỗi chiều đề xuất chấm 0=không phân biệt/không đọc,1=chỉ đọc khi giải thích,2=phân biệt nhưng cần chỉnh,3=phân biệt rõ ở điều kiện thử. Đây là hỗ trợ đánh giá nghệ thuật, không khoa học/metric khách quan. Không chấm số cho hình chưa có. Tổng 0–30: dưới 20 đề xuất revise;20–24 đánh giá có điều kiện;25–30 có thể chuyển đánh giá phê duyệt, **không auto đã duyệt**. Anatomy/gameplay unreadable hoặc giống Sacred khi tắtFX là blocker dù tổng cao. Ngưỡng và scoring vẫn PROPOSED cần art lead duyệt.

| Criterion | Câu hỏi kiểm |
| --- | --- |
| Proportions | Dài/cao/rộng/core khác silhouette đã có? |
| Head | Plane/mỏ/hàm/cổ và hướng nhìn riêng? |
| Limbs | Số/vịtrí/chức năng chi và negative gaps đọc? |
| Tail | Shape/đà/cách dùng khác ornamental đuôi copy? |
| Defining structures | Shell/cánh/sừng/gạc/phần phụ có chức năng riêng? |
| Locomotion posture | Idle/move/turn khác nhịp và tư thế? |
| Center of mass | Điểm nặng/hỗ trợ và balance biểu đạt giải phẫu? |
| Negative space | Khoảng âm còn khi thu nhỏ/turn/FXoff? |
| Gameplay-scale readability | Head/action/direction/contact đọc tại actual display size? |
| Existing-species difference | Side-by-side mọi stage gần giống, khác hơn màu/size? |

Test plan tương lai: black-fill silhouettes, grayscale và color tại scale gameplay dự kiến/native pixels và integer zoom, cùng nền vùng sáng/tối/nhiễu; xem idle/move/attack extrema và all required directions, FXoff/on. Chưa chốt mọi creature cùng dimensions hoặc game resolution. Dùng actual baseline tile 32, Phoenix 96 cell làm tham chiếu density, không prototype score hoặc test sprite mới trong Task12. Nếu smallest supported display size chưa chọn, ghi blocker trước phê duyệt, không chứng nhận đọc được.

Sacred so 12 stage env el op es với phụ/thông thường/boss; wildlife không thành mini Sacred khi phóng scale. Secondary có structures riêng không borrowing crown/antler/đuôi arrangement; thông thường giảm complexity chứ không crop silhouette Sacred; boss lớn nhờ sinh thái/action/space, không auto thêm Sacred authority hoặc remake player Species. Body plan trùng được phép nếu posture/proportion/mechanics khác có evidence. [Overlap table](CREATURE_SIMILARITY_AUDIT.md) là check list bắt buộc, không verdict từ tên.

## Sáu elemental expression profiles — B12-P03

| Element | Motifs | Materials | Movement/animation cues | Environment | Distinguishing features | Avoid |
| --- | --- | --- | --- | --- | --- | --- |
| Thủy | Kênh dòng/vây/màng, bề mặt ướt có lý do | Dòng bám cấu trúc/ẩm có nguồn | Finbrake/current entry | Receiver dòng/áp, không cả ocean conductive | Silhouette và nhịp đẩy thay chỉ cyan | Không mọi loài rùa/xanh/glow |
| Hỏa | Vent/lông chịu nhiệt/khoang trao đổi | Heat/material tolerance có outlet | Co→xả→nguội, thermal glide | Nguồn heat/vent chọn lọc, không lava all map | Khe thoát và nhịp phục hồi thấy được | Không mọi chim có đuôi Phoenix, không auto rebirth |
| Phong | Surface khí động/lông/đuôi lái | Nhẹ/pliable nhưng giải phẫu vẫn có mass | Bank/đổi hướng và luồng rời thân | Lane/áp/landing, không thời tiết toàn map | Tư thế và đường chuyển thay cloud cover | Không gắn cloud lên cùng bốn chân để gọi mới |
| Mộc | Gânlá/rễ/nhánh có growth logic | Livingfiber/leaf có nguồn vật chất | Mở/co/bám/đổi orientation theo đối tác | Viable biological receiver, không resurrection | Sinh trưởng có giải phẫu/direction không auto heal | Không mọi loài plant deer/gạc Ly |
| Lôi | Cơquan tích/xả/phần phụ dẫn hoặc gap cách điện | Conductive/insulatingtraits phải explicit | Charge warning→directional release→recovery | Bounded connector/nguồn, không Wet auto charge | Đường xả/đầu posture/âm warning thay flash only | Không purple evil/strobe/chains vô hạn |
| Kim | Tấm/khớp/grain/edge có lực chức năng | Hardness/thermal response/insulation riêng | Brace/joint open/precise cut/vent | Material receiver có ngưỡng chịu đựng, không every Metal battery | Hình khớp/sức nặng thay chrome tint | Không mọi Metalrobot/full armor immunity hoặc foreign evil |

Dual expression phải giải thích integrated giải phẫu/nguồn/trade-off theo E10, không thân nửađỏ nửa xanh hoặc hai kits cộng lại. Color phụ thuộc art palette, không morality. Life authority không extra elemental FX damage. Visual bounds/core footprint/hurtbox/attack hitbox/depth/culling/segmentation là proposalC04-P07: cần physics/render prototype riêng, không buộc engine hỗ trợ Long/large forms hiện tại. Mây không che mất thân Long; không crop cánh Phượng/gạc Ly để vừa 96 cell. Không sửa existing runtime art trong task này.
