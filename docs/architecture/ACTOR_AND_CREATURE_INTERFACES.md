# Actor và identity có kiểu

**PROPOSED ADR-26-06**; [GameState](../../src/island/GameState.mjs) hiện chỉ tạo PlayerPhoenix, chưa catalog/factory. [Quy design](../chapter1/QUY_DESIGN_OVERVIEW.md) và R03/C04/P15/V13 giữ identity/progression authority. Không production catalog mới.

| Loại | Ý nghĩa / vòng đời | Không được đồng nhất |
| --- | --- | --- |
| SpeciesDefinition / speciesId | Định nghĩa loài ổn định, elemental refs/progression policy | Không actor hoặc tên hiển thị |
| EvolutionStageDefinition / stageId | Anatomy/config và eligibility của stage trong loài | Không ability dù cùng chuỗi quy_s1 |
| PlayableFormDefinition / formId | Identity dạng chơi được R03, trỏ species/stage rules | Không mỗi stage là một form unlock mới |
| ActorInstance / actorInstanceId | Thân runtime thuộc scene/generation, pose/motion, một active control | Không durable species progress hoặc slot |
| EquippedSlot / slotId | Vị trí trong set tối đa3, chứa form ref hoặc empty | Không speciesId, không bắt lấp đủ3 |
| SpeciesProgressRecord | XP/level/mastery/unlocks do P15/R03/V13 | Không nằm trong sprite/controller hoặc reset khi spawn |

Actor interface nhỏ: identityRefs có kiểu, pose `{position,facing}`, movementProfileRef, collisionShapeRef, abilityRefs nếu scope cần; activate(context), deactivate(reason), readView(), dispose(). Controller nhận semantic intent và world query để đề xuất motion; scene áp kết quả một lần. Animation state chỉ playback/action presentation ref; collision footprint/hurtbox/attack shape riêng. Không bắt mọi ambient actor có HP, abilities hoặc player input. Reserve forms là persistent/loadout references, không cần spawn hai actor giả chạy passive trong S0.

activate/deactivate không tự grant/cấp XP/hồi máu; dispose không xóa unlock. Instance mới khi restart S0 có thể thay runtime ID nhưng không mint canonical source. Trong S1 loadout owner quyết active form và actor projection; không scene.savedActiveForm cạnh tranh. Identity của combatant/source cast phải ổn định qua switch theo C14/L16, không lấy sprite instance mới để xóa hit ledger.

Stage/ability lookup dùng typed ref `{kind,id}` và registry đúng kind; raw chuỗi không đủ. Mapping quy_hai_uyen/form_quy_hai_uyen/quy_s1 vẫn ứng viên nguồn, chưa được ADR này approve. D30 ba stage Sacred giữ, không buộc wildlife ba stage. S0 fixture có QuyI là setup demo theo D26-01, không chứng minh E01 grant trong save. Test contract tương lai dùng hai species fixture không canonical: cùng API khác profile/manifest, không core branch theo tên. Không tạo ECS/entity-component scheduler; chỉ thêm khi nhu cầu và đo chi phí chứng minh.
