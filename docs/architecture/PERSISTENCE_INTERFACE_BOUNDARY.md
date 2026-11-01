# Port persistence tương lai

**PROPOSED**; [W07](../technical/PERSISTENT_WORLD_DATA_SPEC.md), [O17](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md), [Task25save](../technical/TASK25_SAVE_AND_PERSISTENCE_AUDIT.md) giữ authority. Không chọn localStorage/IndexedDB/server hoặc viết adapter trong Task26.

Port khái niệm: loadValidated(schemaSupport), commitCandidate(candidate,expectedRevision,operationId), lookupReceipt(canonicalSource), recoverLastGood(reason), exportValidated/importCandidate khi được duyệt. Kết quả cần phân biệt committed/rejected/pending/unsupported/recoveryRequired, trả revision+receipt refs và diagnostic, không boolean saved mơ hồ. Cấu trúc cụ thể/schema cần duyệt trước31.

Domain owners→validate→candidate gồm outcome/patch/placement/recipient updates/receipt→writer→durable acknowledgement→publish view. Storage adapter phụ thuộc port, không domain import storage concrete/DOM. Lost ack tra receipt trước retry cùng operation/source; durable source đã claimed trả frozen result, không chọn recipient mới. Content/schema version không nguồn thưởng mới. Một giao dịch có thể journal hoặc snapshot atomic-equivalent; chưa chọn phương án.

Trước Task31 phải trình approval: phạm vi S1, backend/namespace, snapshot generations so với journal, integrity/version/schema, commit/retention/loss budget, O17 memory receipt trước form, migration aliases/backup, import/export UX, lỗi quota/denied/unknown-newer. Khuyến nghị nhỏ có last-good và expected revision như Task25-GF vẫn PROPOSED. Không claim parentE01 sớm, không chuyển ký ức sau thân để né receipt.

S0 chỉ dùng phiên tạm và explicit restart; không truyền scene demo state vào writer thật, không grant E01 hoặc gọi session marker là progression. UI/farm storage giữ nguyên. S1 load schema không hiểu: giữ bản gốc, recovery/diagnostic; không downgrade/xóa dữ liệu hoặc vào scene với thành công giả. Cached alias mất có thể derive; source/receipt thật mất phải recovery, không tự mint.

Test port bằng in-memory fake để fault injection chỉ chứng minh contract, không durability. Test adapter thật sau31 cần crash trước/sau promote, quota/corrupt/migration/lostack/duplicate/source-recipient consistency; NOT RUN tại26.
