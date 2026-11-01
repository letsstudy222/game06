# Đường dẫn source, build và deployment

safeFile(root,name) tại [validator](../../scripts/validate-assets.cjs) nhận path từ assets/ tương đối gốc dự án. Root mặc định theo __dirname của script, không process.cwd; CLI cho --root tường minh phục vụ fixture/checkout khác. Cấm absolute path, URL/scheme, backslash, control characters, percent encoding, query/hash, empty/dot/dotdot segment. realpath kiểm ancestor tồn tại gần nhất ngăn symlink trỏ ngoài root. Không tuyên bố bảo vệ race khi filesystem bị tiến trình khác cố tình đổi symlink giữa validation và read.

Source path ví dụ assets/... giữ nguyên trong manifest; không lưu /game06/assets/... hoặc đường Codex tuyệt đối. Runtime hiện hữu dùng new URL(url,document.baseURI), nên cùng assets/... resolve đúng tại /game06/. Build copy cùng cây thư mục; browser suite trước/sau chạy actual build dưới prefix đó. Không thực hiện request mạng từ validator.

CLI: npm run validate:assets kiểm3manifest mặc định; node scripts/validate-assets.cjs --root /path/to/checkout assets/test/manifest.json kiểm danh sách chỉ định. Manifest bản thân cũng phải nằm trong assets/. Đường sai báo INVALID_PATH hoặc INVALID_MANIFEST với manifest/field context; exit1. Warning-only exit0. Không expand URL hoặc tự rewrite path để che lỗi.

Build gọi validation trước mọi xóa output. Revision digest đã bao gồm các assets tile cũ và nay thêm atlas Phượng/font/favicon. Không đổi asset bytes; thay resource đó trong tương lai sẽ đổi revision, đã kiểm bằng font fixture tạm. Không là cache framework hoặc persistent content version. Một output revision mới không tạo reward identity.

Workflow Pages vẫn push main/workflow_dispatch, không thay cấu hình hoặc deploy. Push work không tự trigger public workflow. Khi thêm asset mới tương lai cần đưa vào build copy/digest cùng bundle contract, không suy generic manifest tự khiến build đóng gói mọi file. Source master/crop/provenance không là runtime URL hoặc resource tự dùng được.
