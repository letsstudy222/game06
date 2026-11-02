# Hải Uyên Vertical Slice v1.0 — bàn giao web

Ngày 02/11/2026 (Asia/Saigon), branch `work`. Đây là sandbox độc lập, không phải toàn Chương I, không thay canon hoặc Dawn, không merge `main` và không publish/push. Gate 0: [AUDIT](AUDIT.md). Missing canon graph/Task33–34 tiếp tục chặn việc ghép vào world production; không chặn thử nghiệm bốn phòng.

## Chạy

Node >=24, Python 3 và Chromium. Từ `/workspace/game06`:

```sh
npm ci
npm test
npm run build
python3 -m http.server 8000 --bind 127.0.0.1
```

Mở đường dẫn `/hai-uyen.html` qua HTTP server; không dùng `file://`. Static build `_site/hai-uyen.html` dùng cùng server khi serve `_site`. Deployment Pages hiện có sẽ đóng gói entry mới khi người dùng triển khai; chưa có URL công khai của thay đổi này. ES modules, CSS và JSON của sandbox có revision riêng trong build; revision Dawn giữ nguyên.

```sh
npm run test:hai-uyen
# Kiểm thử một build đang được serve, URL phải trỏ tới entry Hải Uyên:
GAME_URL=http://127.0.0.1:8001/hai-uyen.html npm run test:hai-uyen
```

`CHROMIUM_PATH` chọn executable; mặc định `/usr/bin/chromium`. `ARTIFACT_DIR` chọn thư mục ảnh/report. Giữ test browser chạy tuần tự; script tạo ảnh ở thư mục output, không dùng dịch chuyển/debug để giả hành trình. Không chạy các pipeline art Dawn để tạo Hải Uyên. Mỗi cloud task đã được cô lập: dùng checkout hiện tại, không tạo worktree nếu chưa được yêu cầu.

## Chức năng

- Quy I duy nhất hiện thân; HP linh thể 100, baseline giảm damage 15% thử nghiệm. Không mana/rage, AI teammate, playable foreign element, evolution hoặc form switching. Boss khóa membership `['quy', null]` và active Quy; không có đường equip khác giữa trận.
- Di chuyển tám hướng normalized, ngắm chuột; collision tròn radius10, swept <=2px. AI dùng field đường đi với radius thật và collision trạng thái; chỉ mô phỏng actor của phòng hiện tại. Terrain cull theo camera. Map/logic từ đúng bốn JSON M4, không từ PNG.
- Basic trước mặt, K1 projectile 3s; dưới Thủy Mạch/Hồi Thủy dùng đạn vòng, tối đa ba mục tiêu khác nhau; bị tường chặn.
- K2 10s, tâm tối đa190px có clearance, hố hút phẳng 3s; kéo địch thường, damage theo tick0.5s; boss không bị kéo. Cường hóa thêm pulse áp lực ở cuối.
- K3 self buff8s, cooldown24s từ activation; vân sáng gắn mai, không đặt rune trong world. K4 18s, vòng tròn radial145px, một pulse thường/hai pulse cường hóa. Mỗi pulse có ledger riêng để không multi-hit mỗi frame.
- Space 7s, brace1s giảm80% damage sau baseline. Guard đúng0.25s nhận Hồi Thủy cho kỹ năng K1/K2/K4/Space kế tiếp; basic/K3 không tiêu lượt này. Space cường hóa chỉ hồi40% phần damage thực đã ngăn, tối đa8 HP/một lần guard. Không tự hồi HP khi không có đòn hợp lệ. Shared action lock0.16s; cooldown không reset khi đổi phòng/nghỉ/defeat.
- A1: nhập môn, trụ checkpoint, shrine và fragment tự chọn, không địch. B1: cá cận chiến, sứa đặt vùng áp có telegraph; aggro/leash/recovery, nhánh lore và rương một lần. Quái thường trở lại sau khi nghỉ rồi vào lại phòng, không phát thưởng farm.
- LAB: K1 projectile trúng van A; K2 đặt tâm trong24px quanh B sau khi A nạp. Hai flag bền vững mở collision cổng trước pathfinding/load. Dòng chảy ở prototype chỉ VFX, không lực đẩy cưỡng bức.
- ARENA: Cua Giáp Thủy thử nghiệm (không là Boss H). P1 quét càng hình quạt/lao thẳng khóa hướng; P2 <=55% HP thêm vành áp với tâm an toàn. Windup1.05s, recovery1.4s thử nghiệm. Telegraph được vẽ trên actors/skill FX. Boss trước trigger không nhận damage. Lối Tây luôn mở; rút lui/defeat/reload reset attempt chưa thắng. Sau thắng cổng Đông mở, memorial và lưu ký một lần; portal cuối chưa liên kết, không giả chuyển chương.
- Underwater/land chỉ đổi bubble/spray particles. Core skill/hitbox/range/damage/timer không đọc environment tag. Menu cho đối chiếu VFX, không đổi gameplay.

## Save và input

Namespace `hai-uyen.vs.v1.slot.1`–`.3`; không đụng `nhat-diem.ui.v1` hoặc save farm. Một JSON/version chứa flags `vs.*`, receipt journal, inventory token, checkpoint, vị trí/HP và cooldown/buff còn lại. Một `setItem` ghi đồng thời flag + receipt + inventory; thất bại không cấp thưởng/flag giả đã lưu. Defeat receipt riêng có trước chest receipt. Mỗi lần nhận lại là no-op. Token lưu ký là vật phẩm sandbox thử nghiệm, không tiền tệ canon.

Nghỉ bằng E ở checkpoint khi an toàn hồi đầy HP một lần theo thao tác, không tự hồi mỗi frame/entry. Thất bại hồi checkpoint, giữ các world flags/receipts và cooldown; encounter chưa thắng reset. Reload trong giao tranh trả về checkpoint với HP hiện tại, không giữ boss damage; reload ngoài combat giữ vị trí hợp lệ và HP. Cooldown/buff trừ thời gian thực đã trôi khi tải; không serialize projectile/particle transient. Autosave2s và tại skill/damage/world event/transition/visibility loss.

Save sai schema/future version được giữ nguyên, chuyển sang chỉ đọc kèm cảnh báo, có thể chọn hồ sơ khác. Gate flags được kiểm quan hệ, vị trí không hợp lệ về checkpoint. Lỗi quota/quyền ghi hiển thị rõ. Revision check phát hiện tab đã ghi trước đó; không phải backend hoặc transaction đa thiết bị. Nên dùng một tab cho một hồ sơ; không có cloud sync/backup tự động hoặc migration từ world-save production chưa tồn tại.

Desktop: WASD/arrows; mouse aim; click/J basic; 1–4; Space; E; Esc. Touch: joystick trái, kéo nền để ngắm, chạm skill. Pointer capture/release, blur/visibility/menu/resize clear input. Portrait dành control deck riêng để actor không nằm dưới nút ở biên dưới map. Nút >=44px, menu/native dialog, HP meter có nhãn. Chưa chứng nhận accessibility toàn diện hoặc thiết bị thật.

## Art debt và phạm vi chưa làm

Tất cả Quy/quái/props/tiles/FX là **placeholder procedural trong engine**, có nhãn ngay trong game. Một anatomy chung, tám facing rời rạc; NE khác E ở đầu/vây, không crop concept hay tuyên bố native animation production. Không sử dụng hay tự gán license cho các ảnh concept. Không có production idle/move/attack/defend frame atlas, âm thanh, story opening10 nhịp, acquisition/resonance/secondary loadout, A–I/E01–E06, progression/evolution, Windows packaging hay full chapter.

Ưu tiên tiếp theo: (1) cung cấp/đối chiếu graph và decision mới nếu có để chuẩn bị production integration; (2) duyệt master Quy I và atlas animation tám hướng + tileset thật; (3) playtest cảm giác/tuning trên người chơi và mobile thật, profiling thiết bị; (4) chỉ sau đó mở phạm vi world/story. Không tự nâng tên quái/cơ cấu/reward sandbox thành canon.

## Kiểm chứng

Kết quả chi tiết và ảnh thực tại `artifacts/hai-uyen/qa-results.json`; báo cáo này không thay thế log runner. Test thuần dùng `node tests/hai-uyen.test.mjs`, đúng cách runner repository, không coi wrapper một file là một test nghiệp vụ.

- `npm test`: 30 test Dawn cũ +18 test Hải Uyên, không skip. Gồm grid/anchor/BFS thật theo radius, gate trước/sau, 6 cổng, sweep/corner nhiều radius, projectile/limited pierce, pull, hai radial hit ledgers, guard cap/idempotency, AI tells/leash, checkpoint/CD, puzzle/reload, reward transaction, lỗi quota/future/corrupt/stale save.
- `npm run build`: gói static Dawn và Hải Uyên thành công; giữ Dawn revision `cc45f0893967`.
- Playwright: keyboard/mouse thật đi A1→B1→LAB→ARENA, đánh cá, mở rương/lore, refresh giữa van A/B, K1/K2 giải đố, K2 cooldown qua portal, Quy SOLO hạ boss qua cả2 phase/3 tells, nhận reward rồi refresh/chống trùng, quay ARENA→LAB→B1→A1, ba slot và legacy keys.
- 8 ảnh facing ở cùng spawn; kiểm tra mắt bằng ảnh E/NE. Mobile emulation390×844,320×640,844×390: nút/lề, không scroll, joystick + skill đồng thời và pointer release. Đây không phải test trên điện thoại thật hoặc full boss playthrough bằng touch.
- Bổ sung: future-save không bị ghi đè và đổi sang slot khác; frame-time mẫu120 rAF trong Chromium headless (chỉ số trong JSON, không là cam kết FPS thiết bị).
- Lỗi tạm trong quá trình: tick K2 tại mốc0.5s bị sai số float trong test; đã sửa accumulator có epsilon và giữ phần dư, rerun unit đạt. Bản mobile đầu để actor sát nút ở đáy map; đã tách control deck portrait và kiểm thử lại. Không tắt assertion/test để đạt. Rà soát cuối còn sửa ID đòn giữa các lần thử boss để không vô tình tạo miễn sát thương khi retry nhanh; regression test đạt. Phiên HTTP server build hết hạn trong lần smoke cuối đã được khởi động lại và smoke chạy lại thành công; không bỏ qua lỗi kết nối.

Chưa kiểm thử manual bằng người trên thiết bị thật, cross-browser Firefox/WebKit/Safari, mất điện giữa thao tác localStorage, concurrent-tab CAS tuyệt đối hoặc deployment public. Không tuyên bố các mục này đạt.

## Revision và bằng chứng kiểm thử

Full Playwright run trên gói `3aaff1817717` đạt19 checkpoint kiểm thử (mỗi checkpoint gồm nhiều assertions), không phải19 test logic Node. Sau định dạng mã và bổ sung bảo toàn Hồi Thủy khi basic/K3 và ID đòn riêng cho mỗi lần sinh quái, `npm test` đạt48/48; smoke browser của gói cuối `9ea52f9ed807` xác nhận Dawn, Hải Uyên, refresh buff/CD, revision graph và không lỗi asset/page. Báo cáo full run và smoke được giữ riêng để không gộp thành một lần chạy giả.

Ảnh chính: `01-a1.png`, `02-reef.png`, `05-lab-vortex.png`, `tell-sweep.png`, `tell-charge.png`, `tell-ring.png`, `07-boss-cleared.png`, `08-reward.png`, `mobile-small.png`, `10-final-build.png`. Tám ảnh `facing-*.png` là renderer thật, không phải concept. Mẫu120 frame Chromium headless: median16.7ms, p95 16.8ms; không suy thành bảo đảm hiệu năng trên điện thoại.

## Tệp thay đổi

- `hai-uyen.html`: entry web riêng.
- `src/hai-uyen/maps.mjs`, `model.mjs`, `save.mjs`, `view.mjs`, `main.mjs`, `style.css`: adapter/collision/nav, mô phỏng, lưu, render tạm, input/HUD và responsive.
- `data/hai-uyen/VS_A1_FLOORPLAN_AUDITED.json`, `VS_B1_FLOORPLAN_AUDITED.json`, `VS_LAB_FLOORPLAN_AUDITED.json`, `VS_ARENA_FLOORPLAN_AUDITED.json`: bản sao M4 byte-for-byte, không tự sửa floorplan.
- `tests/hai-uyen.test.mjs`, `hai-uyen.browser.cjs`, `hai-uyen.smoke.cjs`: logic, hành trình input thật và smoke gói build.
- `package.json`: thêm Node suite và lệnh browser; `scripts/build-site.cjs`: đóng gói entry và revision graph mới. Không thay dependency hoặc lockfile.
- `README.md`, `docs/hai-uyen/AUDIT.md`, `docs/hai-uyen/DELIVERY.md`: hướng dẫn, audit và bàn giao; tài liệu canon hiện hữu giữ nguyên.
- `artifacts/hai-uyen/`: ảnh thực, JSON full run/smoke và log Node. Không sửa các ảnh bằng chứng Dawn.

## Commit triển khai trên `work`

- `f726042`: audit, dữ liệu M4, adapter/collision và Gate1 tests.
- `61e0648`: mô phỏng kỹ năng/quái/boss/puzzle/checkpoint/save và tests.
- `443ddcb`: entry web, renderer/input/UI desktop-touch, build, test browser/smoke và hướng dẫn.
- `ae98564`: phân biệt receipt đòn giữa các lần thử encounter; regression test và loại kết quả smoke cũ trước lần chạy mới.
- Commit bàn giao tiếp theo chỉ chứa báo cáo và bằng chứng thực. Không merge hoặc push `main`.
