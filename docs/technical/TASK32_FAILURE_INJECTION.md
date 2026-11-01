# Fault fixtures và giới hạn an toàn

Không có nút phá save/art hoặc failure flag trong Dawn mặc định. Các fault sau chỉ chạy qua Node/browser test fixture trong bản sao tạm và profile mới. Không sửa production files để tạo lỗi.

| Fault | Evidence thực / nơi kiểm | Giới hạn |
| --- | --- | --- |
| Missing optional asset | assets.test.cjs: fixture optional cảnh báo, không sprite loài khác thay thế | Không tạo asset Quy giả |
| Missing required asset | assets.test.cjs/validator CLI: nonzero trước build replacement | Không xóa atlas thật |
| Invalid map reference | map.test.mjs: unknown tile/layer/tileset/spawn bị từ chối | Không sửa graph Task 19 |
| Scene entry failure | diagnostics observe + async fixture throw, Dawn đang chạy không bị đổi | Chỉ boundary instrumentation; scene transition engine chưa triển khai |
| Transaction abort | persistence.browser.cjs: abort IndexedDB transaction thật sau put | Mô phỏng deterministic, không power-loss guarantee |
| Invalid save/unsupported version | schema/unit/browser fixtures, original row preserved | Không migrate hoặc grant reward production |
| Lost focus | input/browser suites và debug capture kiểm raw held cleanup | Không đổi pause policy/HP Phượng |
| Touch cancel | input.browser.cjs multi-touch + cancellation | Emulation, không physical mobile |
| Duplicate listeners | Input scope tests; debug double-install/dispose/re-entry | Không engine-wide scene lifecycle proof |
| Unhandled rejection/exception | debug.browser.cjs trên trang test opt-in, expected pageerror từng lần | Runtime diagnostics không preventDefault để che lỗi |
| HTTP missing asset/request failure | Đúng fixture-missing.png, bounded expected rules | Mọi request lỗi khác vẫn unexpected |
| Aggregate child fails/hangs | Unit tạo project Git fixture; exit 7 giữ nguyên, build sau đó không chạy; timeout trả 124 | Git/temp/process-group capabilities cần môi trường phù hợp |

Browser observer không coi mọi warning là fatal. Expected fixture rules có loại, substring và số lần; optional console/requestfailed chỉ cho tín hiệu phụ của đúng request missing-asset chủ động. Không blanket-ignore tất cả 404, exceptions hoặc console errors. Diagnostics không phải nơi thu thập player payload; test observer cũng chỉ chạy profile fixture, không kiểm save thật.

Interrupted storage/backup test giữ authority Task 31, không tạo writer hoặc transaction protocol mới. Các monkeypatch IndexedDB trong tests được phục hồi trong finally và database fixture được dọn. Full receipt ordering, HP recovery, actual scene swap và boss defeat vẫn là gates tương lai.
