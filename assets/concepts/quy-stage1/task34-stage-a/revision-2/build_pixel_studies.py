"""Task34 Stage A Revision2: nghiên cứu pixel phi sản xuất, không import vào game.
Dựng mảng polygon trực tiếp trên lưới pixel, không đọc/thu nhỏ concept illustration.
Phóng bảng xem bằng NEAREST; phối cảnh là quy ước vẽ, không physics/runtime Z.
Chạy từ thư mục bất kỳ: python /path/to/build_pixel_studies.py (cần Pillow).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math, json
ROOT=Path(__file__).resolve().parent
FONT='DejaVuSans.ttf'  # Pillow tìm font hệ thống; cài DejaVu Sans để tái tạo bảng tiếng Việt.
DIRECTIONS={'n':math.pi,'ne':-3*math.pi/4,'e':-math.pi/2,'se':-math.pi/4,'s':0,'sw':math.pi/4,'w':math.pi/2,'nw':3*math.pi/4}
VI={'n':'Bắc','ne':'Đông bắc','e':'Đông','se':'Đông nam','s':'Nam','sw':'Tây nam','w':'Tây','nw':'Tây bắc'}
PALETTES={
 'jade': ['#101F2B','#173542','#214C55','#2D6163','#3C7570','#578E7D','#7DAA91','#A5BCA2','#C8C9AD','#3E5F61','#1B354B','#244A62','#37657B','#527F8C','#89AAA8','#67C6B3'],
 'ocean':['#101F2B','#182E42','#20465A','#2A5A6E','#367184','#538E91','#7BAAA2','#A4BCAD','#C4C9B9','#3D596B','#192F4B','#244763','#365F7C','#507D92','#8CA9B8','#68BACA']}
RGBA=lambda h:tuple(bytes.fromhex(h.lstrip('#')))+(255,)
def sprite(size=(80,80),direction='s',palette='jade',pose='idle'):
 im=Image.new('RGBA',size,(0,0,0,0));d=ImageDraw.Draw(im);colors=[RGBA(h) for h in PALETTES[palette]]
 angle=DIRECTIONS[direction];cx,cy=size[0]//2,size[1]//2
 def p(v,z=0):
  x,y=v;return(round(cx+math.cos(angle)*x-math.sin(angle)*y),round(cy+.85*(math.sin(angle)*x+math.cos(angle)*y)-z))
 def poly(pts,fill,outline=0,z=0):
  q=[p(v,z) for v in pts];d.polygon(q,fill=colors[fill]);
  if outline is not None:d.line(q+[q[0]],fill=colors[outline],width=1)
 def line(pts,color,z=0):d.line([p(v,z) for v in pts],fill=colors[color],width=1)
 # Bốn vây có gốc thật dưới mai. Tư thế brake chỉ là extrema thăm dò.
 extra=1 if pose=='brake' else (-2 if pose=='swim' else 0)
 for sign in [-1,1]:
  poly([(sign*x,y) for x,y in [(10,-9),(14,-15),(18,-21),(21,-20),(20,-15),(15,-6)]],3)
  poly([(sign*x,y) for x,y in [(14,-13),(18,-19),(19,-17),(16,-10)]],5,None)
  poly([(sign*x,y) for x,y in [(12,4),(18,6),(23+extra,12),(24+extra,16),(20+extra,19),(16,17),(11,13),(9,8)]],4)
  poly([(sign*x,y) for x,y in [(13,7),(18,8),(22+extra,13),(22+extra,16),(19,17),(15,13)]],6,None)
  line([(sign*16,12),(sign*(21+extra),17)],3)
 poly([(-2,-17),(-1,-24),(2,-20),(3,-16)],3)
 # Cổ và đầu vẽ trước mai để gốc cổ gắn đúng phía trước, không floating limb.
 poly([(-5,13),(5,13),(5,23),(0,27),(-5,23)],3)
 poly([(-5,21),(-2,19),(4,20),(7,24),(5,27),(0,29),(-5,27),(-7,25)],5)
 poly([(-3,27),(0,28),(3,27),(1,29),(-2,28)],8,None)
 poly([(-4,21),(0,20),(4,22),(4,25),(0,27),(-3,25)],6,None)
 # Mắt nhỏ, không mirror một ảnh: mỗi hướng được dựng lại trong cùng ánh sáng màn hình.
 for x in [-4,4]:
  q=p((x,25));d.rectangle((q[0],q[1],q[0]+1,q[1]),fill=colors[0])
 line([(-1,27),(1,27)],2)
 outer=[(-8,-18),(6,-18),(14,-13),(18,-5),(18,7),(13,15),(4,19),(-7,18),(-16,12),(-19,2),(-17,-10)]
 # Signature viền: hai cặp gờ sóng thấp gắn cùng gốc mai, không giáp rời/gai cao.
 for sign in [-1,1]:
  poly([(sign*x,y) for x,y in [(16,-11),(21,-12),(23,-10),(20,-8),(23,-5),(18,-5),(16,-6)]],4,z=1)
  poly([(sign*x,y) for x,y in [(17,2),(22,2),(24,5),(21,6),(22,9),(18,10),(15,8)]],4,z=1)
  line([(sign*18,-10),(sign*20,-8)],6,z=1)
  line([(sign*18,5),(sign*20,7)],6,z=1)
 poly(outer,1,z=0);poly(outer,10,z=3)
 # Phiến lớn: phân mặt màu kín, không noise và không pixelate ảnh lớn.
 facets=[([(-8,-17),(1,-17),(2,-10),(-7,-7),(-14,-11)],4),
         ([(1,-17),(6,-17),(13,-12),(8,-6),(2,-10)],3),
         ([(-14,-10),(-7,-7),(-8,3),(-16,6),(-18,1),(-16,-8)],3),
         ([(-7,-7),(2,-10),(8,-6),(8,5),(0,10),(-8,3)],2),
         ([(8,-6),(14,-11),(17,-4),(17,6),(8,5)],11),
         ([(-16,7),(-8,4),(0,11),(-5,16),(-14,11)],11),
         ([(0,11),(8,6),(16,7),(12,14),(4,17),(-4,16)],10)]
 for pts,c in facets:
  # Nguồn sáng cố định phía trên trái màn hình, không lật ánh sáng theo hướng.
  px=sum(p(v,3)[0] for v in pts)/len(pts);py=sum(p(v,3)[1] for v in pts)/len(pts)
  cc=c if px+py>=cx+cy-10 else min(c+1,6) if c<6 else c
  poly(pts,cc,1,z=3)
 line([(-15,-9),(-13,-12),(-8,-15),(-3,-15)],5,z=3)
 # Hai rãnh nước nhỏ, màu trung gian; không emissive, không glyph lore.
 line([(-3,-5),(1,-5),(3,-2),(2,2)],3,z=3)
 line([(-3,6),(0,7),(3,6)],3,z=3)
 # Mấu nối tự nhiên, không giáp/crown; vùng rim phía trước dày vừa 2-3px.
 line([(-12,14),(-6,17),(3,18),(10,15)],9,z=1)
 # Mặt trước cần thấy đoạn cổ; cùng anatomy, chỉ thay thứ tự trình bày theo hướng.
 if direction in ['s','se','sw']:
  poly([(-4,17),(4,17),(4,23),(-4,23)],4)
  poly([(-5,21),(-2,19),(4,20),(7,24),(5,27),(0,29),(-5,27),(-7,25)],5)
  poly([(-3,27),(0,28),(3,27),(1,29),(-2,28)],8,None)
  poly([(-4,21),(0,20),(4,22),(4,25),(0,27),(-3,25)],6,None)
  for x in [-4,4]:
   q=p((x,25));d.rectangle((q[0],q[1],q[0]+1,q[1]),fill=colors[0])
  line([(-1,27),(1,27)],2)
 # Signature xuyên lineage: xoáy giữa mai và giọt trán. Màu đục, không halo/glow.
 line([(-5,-6),(-2,-8),(3,-8),(6,-5),(6,0),(3,4),(-2,5),(-6,2),(-6,-2),(-3,-5),(1,-5),(3,-3),(3,0),(1,2),(-2,1),(-2,-1),(0,-2)],15,z=3)
 poly([(0,-3),(2,-1),(1,1),(-1,0)],15,None,z=3)
 poly([(0,21),(2,24),(0,26),(-2,24)],15,1)
 return im

def font(n):return ImageFont.truetype(FONT,n)
def board(size,title,subtitle):
 im=Image.new('RGB',size,'#101E2A');d=ImageDraw.Draw(im);d.text((28,20),title,font=font(25),fill='#E5E8D7');d.text((28,58),subtitle,font=font(14),fill='#ACBFC2');return im

def place(board,spr,xy,scale=1):
 out=spr.resize((spr.width*scale,spr.height*scale),Image.Resampling.NEAREST) if scale!=1 else spr
 board.paste(out,xy,out)
def checker(im,box):
 d=ImageDraw.Draw(im)
 for y in range(box[1],box[3],12):
  for x in range(box[0],box[2],12):d.rectangle((x,y,min(x+11,box[2]-1),min(y+11,box[3]-1)),fill='#1C303C' if ((x-box[0])//12+(y-box[1])//12)%2 else '#243D47')
def sil(im):
 out=Image.new('RGBA',im.size,(0,0,0,0));out.paste((5,15,21,255),(0,0),im.getchannel('A'));return out

def main():
 for pal in PALETTES:
  for w,h in [(64,64),(64,80)]:sprite((w,h),'s',pal).save(ROOT/f'pixel-{pal}-{w}x{h}.png')
 for w,h in [(80,64),(80,72)]:sprite((w,h),'s').save(ROOT/f'pixel-jade-{w}x{h}.png')
 for direction in DIRECTIONS:sprite((64,64),direction).save(ROOT/f'direction-{direction}-64x64.png')
 for pose in ['swim','brake']:sprite((64,80),'se',pose=pose).save(ROOT/f'pose-{pose}-64x80.png')
 sil(sprite((64,64))).save(ROOT/'silhouette-64x64.png')
 # Bảng palette: cùng geometry native, hai nền phẳng có tương phản khác, không map production.
 b=board((1120,810),'QUY HẢI UYÊN I — REVISION 2','PHI SẢN XUẤT • pixel dựng bằng mã ở độ phân giải gốc • tất cả phương án PROPOSED')
 d=ImageDraw.Draw(b)
 for col,pal in enumerate(PALETTES):
  x=28+col*550;d.text((x,97),'NGỌC TRẦM' if pal=='jade' else 'BIỂN SÂU',font=font(20),fill='#E5E8D7')
  for row,bg in enumerate(['#84BABE','#142D40']):
   y=136+row*260;d.rectangle((x,y,x+510,y+234),fill=bg)
   if row==0:
    # Nền san hô giả lập để kiểm tương phản, không tile/map production.
    d.line([(x+34,y+210),(x+65,y+165),(x+64,y+110)],fill='#9AA598',width=12)
    d.line([(x+65,y+165),(x+104,y+146),(x+119,y+116)],fill='#9AA598',width=9)
    d.line([(x+60,y+179),(x+31,y+149),(x+27,y+129)],fill='#B1A1A0',width=9)
   place(b,sprite((80,80),'se',pal),(x+12,y+10),3)
   place(b,sprite((64,64),'s',pal),(x+325,y+100));d.text((x+290,y+20),'Nước sáng' if row==0 else 'Nước tối',font=font(17),fill='#1A343A' if row==0 else '#DBE4D8');d.text((x+300,y+180),'1×, không thu nhỏ',font=font(13),fill='#1A343A' if row==0 else '#DBE4D8')
  for i,c in enumerate(PALETTES[pal]):d.rectangle((x+i*32,687,x+i*32+28,711),fill=c)
  d.text((x,730),'16 màu bảng; ấn Thủy là màu đục, không glow.',font=font(14),fill='#ACBFC2')
 b.save(ROOT/'palette-comparison.png')
 b=board((1360,840),'SO KHUNG NATIVE — GIỮ CÙNG THƯỚC PIXEL','Cùng thân/pose S; chỉ đổi khung và vị trí neo. NEAREST 4× để xem; mẫu nhỏ là 1×.')
 d=ImageDraw.Draw(b)
 for i,size in enumerate([(64,64),(64,80),(80,64),(80,72)]):
  x=24+i*334;s=sprite(size);d.text((x,100),f'{size[0]}×{size[1]}',font=font(23),fill='#DDE8D5');checker(b,(x,145,x+320,145+size[1]*4));place(b,s,(x+(320-size[0]*4)//2,145),4)
  place(b,s,(x+128,505));d.text((x+116,593),'Gốc 1×',font=font(14),fill='#ACBFC2')
  d.text((x,644),'Khung trung tính, chưa kiểm đủ',font=font(14),fill='#ACBFC2');d.text((x,667),'coverage bằng animation thực.',font=font(14),fill='#ACBFC2')
 d.text((28,741),'R2 dựng lại biên vây ở pixel gốc; không thu nhỏ ảnh minh họa hoặc R1.',font=font(18),fill='#E5C99B')
 d.text((28,776),'64×80 thêm đệm cho chuyển động; tất cả khung vẫn cần duyệt trước production.',font=font(16),fill='#ACBFC2');b.save(ROOT/'scale-comparison.png')
 b=board((1120,810),'R2 — TÁM HƯỚNG NATIVE 64×64','8 ảnh dựng riêng từ cấu trúc 2D • không flip bitmap • không clip/atlas production')
 d=ImageDraw.Draw(b)
 for i,di in enumerate(['n','ne','e','se','s','sw','w','nw']):
  x=24+(i%4)*275;y=112+(i//4)*337;checker(b,(x,y,x+256,y+256));place(b,sprite((64,64),di),(x,y),4);d.text((x,y+269),f'{di.upper()} — {VI[di]}',font=font(17),fill='#DCE6D6')
 b.save(ROOT/'directional-exploration.png')
 b=board((1080,590),'R2 — MAI VÀ VIỀN SÓNG THẤP','N / SE / S • phi sản xuất • kiểm khối đọc được khi bỏ màu và hoa văn')
 d=ImageDraw.Draw(b)
 for i,di in enumerate(['n','se','s']):
  x=28+i*350;d.rectangle((x,115,x+320,435),fill='#D1D6C8');place(b,sil(sprite((80,80),di)),(x,115),4);d.text((x,462),di.upper(),font=font(20),fill='#DCE6D6')
 d.text((28,532),'Gờ sóng cùng gốc mai; không đổi lineage khi tăng bậc. Chờ duyệt hình cụ thể.',font=font(16),fill='#ACBFC2');b.save(ROOT/'silhouette-review.png')
 b=board((1080,510),'R2 — NGHỈ, BƠI VÀ HÃM','Không phải animation hoàn chỉnh; chưa có timing, frame chuyển tiếp hoặc gameplay marker')
 d=ImageDraw.Draw(b)
 for i,(pose,label) in enumerate([('idle','Nghỉ'),('swim','Đạp nước'),('brake','Hãm / mở vây')]):
  x=24+i*350;checker(b,(x,112,x+320,432));place(b,sprite((80,80),'se',pose=pose),(x,112),4);d.text((x,450),label,font=font(18),fill='#DCE6D6')
 b.save(ROOT/'motion-keyposes.png')
 # Mockup dọc ở kích thước CSS giả định; không screenshot/runtime UI.
 b=Image.new('RGB',(390,844),'#101E2A');d=ImageDraw.Draw(b)
 d.text((14,18),'R2 — BỐ CỤC 390×844',font=font(21),fill='#E5E8D7')
 d.text((14,53),'Mô phỏng tĩnh, không phải screenshot game',font=font(12),fill='#ACBFC2')
 for y,size in [(100,(64,64)),(380,(80,72))]:
  d.rectangle((14,y,375,y+245),fill='#244451')
  d.text((25,y+14),f'{size[0]}×{size[1]} native → CSS 2×',font=font(17),fill='#E5E8D7')
  spr=sprite(size,'s');place(b,spr,((390-spr.width*2)//2,y+62),2)
 d.rectangle((14,670,375,786),outline='#667D82',width=1)
 d.text((28,690),'Khoảng dự phòng thao tác / lời nhắc',font=font(15),fill='#ACBFC2')
 d.text((28,722),'Không thêm nút hoặc binding gameplay.',font=font(13),fill='#ACBFC2')
 d.text((14,810),'PHI SẢN XUẤT • cần kiểm máy thật về sau',font=font(13),fill='#ACBFC2')
 b.save(ROOT/'mobile-layout-study.png')
 # Bảng đọc ba signature từ chính pixel native, không crop/pixelate concept minh họa.
 b=board((1120,610),'R2 — BA DẤU HIỆU LINH THÚ TỪ BẬC I','Hình học cụ thể vẫn PROPOSED • màu đục, không glow • native64×64 phóng NEAREST6×')
 d=ImageDraw.Draw(b);checker(b,(30,125,414,509));place(b,sprite((64,64),'s'),(30,125),6)
 for box,num in [((24,18,41,38),'1'),((8,18,22,45),'2'),((28,48,37,58),'3')]:
  x1,y1,x2,y2=box;d.rectangle((30+x1*6,125+y1*6,30+x2*6,125+y2*6),outline='#E2C485',width=2)
  d.text((30+x2*6+3,125+y1*6),num,font=font(19),fill='#E2C485')
 for y,title,desc in [(150,'1. Xoáy nước cổ giữa mai','Cùng chiều xoáy; dấu đục đọc được, không halo.'),(270,'2. Hai cặp gờ sóng viền mai','Nhận diện bằng biên khối, không phụ thuộc màu.'),(390,'3. Ấn giọt Thủy giữa trán','Nhỏ nhưng có hình; cần họa sĩ tinh chỉnh góc chéo.')]:
  d.text((510,y),title,font=font(22),fill='#E5E8D7');d.text((510,y+42),desc,font=font(16),fill='#ACBFC2')
 d.text((30,554),'Không artwork được duyệt / không production asset. BậcII–III phát triển từ cùng ba dấu này.',font=font(16),fill='#ACBFC2')
 b.save(ROOT/'signature-detail-board.png')
 # Đo envelope trên canvas dư; ghi diagnostic, không tạo production manifest.
 results={}
 for size in [(64,64),(64,80),(80,64),(80,72),(80,80)]:
  failures=[];clipped=[]
  for direction in DIRECTIONS:
   for pose in ['idle','swim','brake']:
    large=sprite((160,160),direction,pose=pose);bb=large.getchannel('A').getbbox();dx=80-size[0]//2;dy=80-size[1]//2
    bbox=[bb[0]-dx,bb[1]-dy,bb[2]-dx,bb[3]-dy]
    if bbox[0]<2 or bbox[1]<2 or bbox[2]>size[0]-2 or bbox[3]>size[1]-2:failures.append(f'{direction}/{pose}')
    if bbox[0]<0 or bbox[1]<0 or bbox[2]>size[0] or bbox[3]>size[1]:clipped.append(f'{direction}/{pose}')
  results[f'{size[0]}x{size[1]}']={'margin_px':2,'cases':24,'outside_margin':failures,'clipped':clipped}
 (ROOT/'study-measurements.json').write_text(json.dumps({'nonproduction':True,'revision':'task34-stage-a-r2','paletteHex':PALETTES,'envelopes':results},ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(results,ensure_ascii=False))
if __name__=='__main__':main()
