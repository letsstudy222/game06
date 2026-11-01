# Layer, depth-sort và occlusion

Không tạo render graph mới. IslandScene giữ thứ tự các pha; chỉ thay comparator, fade và thao tác vẽ frame bằng helper có kiểm thử.

| Pha hiện tại | Ordering / owner | Khả năng mở rộng tương lai |
| --- | --- | --- |
| Terrain | WorldLayer, trước props; có tile culling | Background và độ sâu dưới nước cần scene content mới |
| Shadow/ambient | World-space, trước actor list | Light shafts/decor không tự là lực dòng chảy |
| Props/player | Sort y hoặc depthY; tie theo renderOrder | Actor, wildlife, interactable và scenery dùng cùng anchor convention |
| Skills/shrine | Giữ sau depth list | Chưa phải telegraph renderer tổng quát |
| Overlay tương lai | Chưa triển khai | Tint/particles tùy scene, không phủ xanh toàn Dawn |
| HUD | DOM ngoài world transform | Không bị camera/zoom world tác động, không sở hữu progression |

`compareRenderDepth` ưu tiên depthY, còn lại y; renderOrder là tie-breaker tường minh. Dawn cấp thứ tự rocks → bushes → hazards → props → trees → player như insertion cũ. Caller tương lai phải cấp thứ tự ổn định trong list; không dịch actor để sửa sorting. Metadata không hữu hạn bị từ chối.

`foregroundAlpha` giữ đúng cửa sổ tán cây cũ: actor nằm phía trên anchor cây và trong giới hạn cao/rộng thì alpha 0.48, ngoài cửa sổ là 1. Không đổi tọa độ hoặc fade tất cả decoration. Chưa có polygon occlusion hay bảo đảm visibility cho mọi map tương lai.

## Yêu cầu cho Tasks 49–55 và 73–77

Critical telegraph và safe lane cần pha vẽ sau decor có thể che khuất, trước HUD, hoặc visibility override được duyệt. Hitbox/facing lấy từ action gameplay, không từ glow hoặc visual fallback. Required warning phải còn khi tắt FX, giảm chuyển động hoặc dùng hỗ trợ phân biệt màu; kết hợp shape/edge/symbol thay chỉ màu.

Từng room phải kiểm player silhouette và critical warning không bị foreground/overlay che. Đây là contract triển khai sau, chưa có boss pattern hoặc telegraph engine mới. Water tint, background depth, bioluminescence, current indicator, vegetation và particles chỉ là các điểm mở rộng presentation; giảm atmosphere trước khi giảm cue thiết yếu.
