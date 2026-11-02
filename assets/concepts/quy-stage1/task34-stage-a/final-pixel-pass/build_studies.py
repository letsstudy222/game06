"""Lượt pixel study cuối Stage A: phi sản xuất, không đọc/thu nhỏ ảnh concept.
Các cấu trúc I/II/III được đặt tọa độ riêng; II/III chỉ một preview lineage.
Pillow rasterize trực tiếp trên lưới pixel; chỉ bảng xem dùng NEAREST.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math,json
ROOT=Path(__file__).resolve().parent
# Mảng màu chức năng, không noise/blur hoặc phép pixel hóa ảnh.
HEX=['#112C38','#173F4A','#215665','#286B76','#35818B','#469A9C','#66B2A7','#90C9B7','#C0D0BA','#526F72','#243B53','#2B506B','#3B7088','#5597AC','#70C6C6','#A3E2D7','#D3F3E1','#3BB5C1','#6DE2E7','#B5F8EE']
C=[tuple(bytes.fromhex(x[1:]))+(255,) for x in HEX]
# Tọa độ độc lập, thay đổi cả tỷ lệ lẫn cấu trúc, không resize ảnh của bậc trước.
DATA={
 1:dict(size=(64,64),lift=3,head=[(-3,18),(1,18),(4,20),(5,23),(2,29),(-2,27),(-4,23)],
        front=[(11,4),(17,5),(22,10),(24,15),(22,18),(18,17),(12,12),(9,7)],
        rear=[(10,-8),(14,-14),(18,-18),(20,-17),(18,-12),(14,-6)],
        shell=[(-8,-15),(4,-16),(12,-12),(15,-6),(16,3),(13,11),(6,16),(-4,16),(-12,11),(-16,4),(-16,-5),(-13,-12)],
        a=16,b=16,rim=[(-8,2),(7,2)],face_y=23),
 2:dict(size=(96,88),lift=4,head=[(-6,25),(-2,22),(4,23),(8,28),(6,33),(1,38),(-4,35),(-7,30)],
        front=[(17,4),(25,5),(32,11),(35,18),(34,23),(30,25),(21,20),(14,12)],
        rear=[(15,-12),(21,-21),(27,-26),(29,-24),(27,-18),(22,-11),(17,-8)],
        shell=[(-11,-23),(7,-24),(19,-18),(24,-9),(26,3),(23,14),(14,23),(-1,25),(-17,21),(-25,10),(-25,-3),(-20,-16)],
        a=25,b=24,rim=[(-13,4),(2,4),(15,3)],face_y=29),
 3:dict(size=(112,104),lift=7,head=[(-8,31),(-3,28),(5,29),(10,34),(9,40),(3,46),(-3,43),(-8,38)],
        front=[(22,4),(31,4),(39,10),(44,18),(44,24),(40,29),(33,27),(25,20),(18,11)],
        rear=[(20,-15),(28,-27),(35,-31),(37,-28),(34,-21),(28,-13),(22,-10)],
        shell=[(-15,-29),(8,-30),(24,-24),(31,-13),(33,1),(31,15),(20,27),(2,32),(-18,28),(-30,17),(-33,3),(-29,-14),(-22,-25)],
        a=32,b=30,rim=[(-19,6),(-6,7),(8,7),(21,5)],face_y=36)
}
SPIRAL={
 1:[(-5,-6),(-1,-8),(3,-7),(6,-4),(6,0),(3,4),(-2,5),(-6,2),(-6,-2),(-3,-5),(1,-4),(3,-2),(2,1),(-1,2),(-2,0),(0,-1)],
 2:[(-8,-8),(-3,-12),(4,-12),(9,-8),(11,-2),(9,5),(3,9),(-4,9),(-9,5),(-10,-1),(-6,-7),(0,-8),(5,-4),(5,1),(2,5),(-2,4),(-4,1),(-2,-2),(1,-2)],
 3:[(-10,-12),(-4,-16),(5,-15),(12,-10),(15,-3),(13,6),(7,12),(-2,14),(-10,10),(-14,3),(-13,-5),(-7,-11),(1,-11),(8,-6),(9,1),(5,7),(-1,8),(-6,4),(-6,-2),(-2,-5),(2,-3),(3,1),(0,3)]}
def sprite(stage=1,size=None,direction='se',pose='idle'):
 cfg=DATA[stage];size=size or cfg['size'];im=Image.new('RGBA',size,(0,0,0,0));d=ImageDraw.Draw(im)
 angle={'s':0,'se':-math.pi/4}[direction];cx,cy=size[0]//2,size[1]//2
 def p(v,lift=0):
  x,y=v;return round(cx+math.cos(angle)*x-math.sin(angle)*y),round(cy+.85*(math.sin(angle)*x+math.cos(angle)*y)-lift)
 def poly(pts,c,edge=0,lift=0):
  q=[p(v,lift) for v in pts];d.polygon(q,fill=C[c])
  if edge is not None:d.line(q+[q[0]],fill=C[edge],width=1)
 def line(pts,c,lift=0,width=1):d.line([p(v,lift) for v in pts],fill=C[c],width=width)
 def head():
  a=cfg['a'];fy=cfg['face_y'];poly([(-4,cfg['b']-6),(4,cfg['b']-6),(5,fy+2),(-5,fy+2)],3)
  poly(cfg['head'],5)
  # Mặt trên/ven hàm thành cụm, mắt ít pixel để không chibi.
  poly([(-3,fy-3),(1,fy-4),(4,fy-1),(3,fy+2),(-1,fy+3),(-4,fy)],6,None)
  poly([(-3,fy+3),(1,fy+5),(4,fy+2),(2,fy+6),(-1,fy+5)],8,None)
  for x in [-3,4]:
   q=p((x,fy+1));d.line((q[0],q[1],q[0]+1,q[1]),fill=C[0],width=1)
  r=1 if stage==1 else 2
  poly([(0,fy-4),(r+1,fy-1),(0,fy+2),(-r-1,fy-1)],14 if stage<3 else 18,2)
  if stage==3:line([(0,fy-2),(0,fy)],19)
 for sign in [-1,1]:
  poly([(sign*x,y) for x,y in cfg['rear']],3)
  rear=cfg['rear'];line([(sign*rear[1][0],rear[1][1]),(sign*rear[2][0],rear[2][1])],6)
  pts=[(sign*(x-(2 if pose=='swim' and i in [2,3,4] else 0)),y+(1 if pose=='swim' and i in [2,3,4] else 0)) for i,(x,y) in enumerate(cfg['front'])]
  poly(pts,4)
  # Mặt vây có hướng/khớp, không gắn các vảy ngẫu nhiên.
  x1,y1=cfg['front'][1];x2,y2=cfg['front'][3];x3,y3=cfg['front'][-2]
  poly([(sign*(x1-1),y1+2),(sign*(x2-2),y2),(sign*(x2-4),y2+3),(sign*x3,y3+1)],6,None)
  line([(sign*(x1+1),y1+3),(sign*(x2-2),y2+3)],3)
  if stage>1:line([(sign*(x1+2),y1+1),(sign*(x2-1),y2-1)],7)
 b=cfg['b'];poly([(-2,-b+2),(-1,-b-5),(2,-b-3),(3,-b+2)],3)
 head()
 # Viền từ cùng gốc sóng: I hai cặp thấp, II ba cặp, III bốn cặp có lớp.
 for sign in [-1,1]:
  for yy,ext in cfg['rim']:
   aa=cfg['a']-abs(yy)*.10
   pts=[(aa-3,yy-3),(aa+ext-1,yy-4),(aa+ext+2,yy-1),(aa+1,yy+1),(aa+ext,yy+3),(aa-3,yy+5)]
   poly([(sign*x,y) for x,y in pts],4 if stage==1 else 5,0,lift=1)
   line([(sign*(aa-1),yy-2),(sign*(aa+ext),yy-1)],6 if stage==1 else 8,lift=1)
 # Độ dày mai biểu đạt bằng các mặt pixel, không physicalZ runtime.
 poly(cfg['shell'],1,lift=0);poly(cfg['shell'],10,lift=cfg['lift'])
 a,b=cfg['a'],cfg['b'];L=cfg['lift']
 facets=[([(-.48*a,-.85*b),(.12*a,-.90*b),(.20*a,-.42*b),(-.40*a,-.25*b),(-.78*a,-.48*b)],3),
         ([(.13*a,-.90*b),(.48*a,-.74*b),(.84*a,-.34*b),(.43*a,-.14*b),(.21*a,-.42*b)],11),
         ([(-.82*a,-.44*b),(-.41*a,-.21*b),(-.43*a,.27*b),(-.86*a,.41*b),(-.97*a,.10*b)],4),
         ([(-.40*a,-.24*b),(.19*a,-.41*b),(.47*a,-.11*b),(.45*a,.37*b),(.02*a,.64*b),(-.44*a,.27*b)],2),
         ([(.48*a,-.08*b),(.91*a,-.27*b),(.96*a,.29*b),(.70*a,.66*b),(.46*a,.36*b)],11),
         ([(-.86*a,.44*b),(-.43*a,.30*b),(.01*a,.66*b),(-.15*a,.92*b),(-.72*a,.69*b)],10),
         ([(.02*a,.67*b),(.48*a,.39*b),(.73*a,.68*b),(.28*a,.93*b),(-.13*a,.92*b)],1)]
 for pts,col in facets:poly(pts,col,1,L)
 line([(-a*.80,-b*.40),(-a*.71,-b*.64),(-a*.46,-b*.79),(-a*.12,-b*.83)],5,L)
 line([(-a*.69,b*.69),(-a*.13,b*.92),(a*.28,b*.93),(a*.68,b*.69)],9,1)
 if stage>=2:
  line([(-a*.68,-b*.07),(-a*.77,b*.12),(-a*.62,b*.36)],5,L)
  line([(a*.59,-b*.16),(a*.76,b*.02),(a*.66,b*.28)],12,L)
 if stage==3:
  # Khác cấu trúc: rãnh phụ theo mặt lực và các đoạn sáng cục bộ, không halo toàn thân.
  for sign in [-1,1]:
   line([(sign*17,-11),(sign*23,-7),(sign*24,2)],14,L)
   line([(sign*20,12),(sign*17,17),(sign*10,22)],5,L)
   line([(sign*26,-8),(sign*27,-5)],18,L)
 line(SPIRAL[stage],14 if stage==1 else (15 if stage==2 else 18),L,1 if stage==1 else 2)
 poly([(0,-3),(2,-1),(1,1),(-1,0)],14 if stage==1 else (15 if stage==2 else 19),None,L)
 if direction in ['se','s']:head()
 return im

def font(n):return ImageFont.truetype('DejaVuSans.ttf',n)
def panel(size,title,subtitle):
 im=Image.new('RGB',size,'#102534');d=ImageDraw.Draw(im);d.text((24,18),title,font=font(25),fill='#E6EBD7');d.text((24,55),subtitle,font=font(14),fill='#AEC4C4');return im

def place(im,sp,xy,k=1):
 out=sp.resize((sp.width*k,sp.height*k),Image.Resampling.NEAREST) if k!=1 else sp
 im.paste(out,xy,out)
def main():
 for w,h in [(64,64),(64,80)]:sprite(size=(w,h)).save(ROOT/f'stage1-se-{w}x{h}.png')
 sprite(size=(64,64),direction='s').save(ROOT/'stage1-s-64x64.png')
 sprite(size=(64,80),pose='swim').save(ROOT/'stage1-swim-key-64x80.png')
 for stage in [2,3]:sprite(stage).save(ROOT/f'stage{stage}-lineage-preview.png')
 b=panel((1140,740),'BẬC I — LƯỢT PIXEL STUDY CUỐI STAGE A','Native64×64 và64×80 • dựng pixel trực tiếp, không downsample concept • chưa sprite production')
 d=ImageDraw.Draw(b)
 for col,sz in enumerate([(64,64),(64,80)]):
  x=24+col*560;d.text((x,100),f'{sz[0]}×{sz[1]} — NEAREST3× và gốc1×',font=font(20),fill='#E6EBD7')
  sp=sprite(size=sz)
  for row,bg in enumerate(['#83B8BD','#132D43']):
   y=145+row*270;d.rectangle((x,y,x+532,y+245),fill=bg);place(b,sp,(x+22,y+12),3);place(b,sp,(x+380,y+90))
   d.text((x+325,y+20),'Nước sáng' if row==0 else 'Nước tối',font=font(18),fill='#143D48' if row==0 else '#DFE9D7')
   d.text((x+355,y+190),'Mẫu gốc1×',font=font(14),fill='#143D48' if row==0 else '#DFE9D7')
 d.text((24,705),'Khung cao chỉ thêm padding; cùng thân và cùng thước pixel. Chờ duyệt motif, mặt và khung.',font=font(16),fill='#B7C8C7');b.save(ROOT/'stage1-light-dark-comparison.png')
 b=panel((1220,770),'BA BẬC — KIỂM TRA LINEAGE BẰNG PIXEL','II vàIII chỉ một preview so dòng, không full sprites • cùng nguồn pixel/world scale, không resize bậcI')
 d=ImageDraw.Draw(b)
 for i,stage in enumerate([1,2,3]):
  sp=sprite(stage);x=24+i*398
  d.text((x,99),f'BẬC {stage} — gốc{sp.width}×{sp.height}',font=font(20),fill='#E6EBD7')
  for row,bg in enumerate(['#83B8BD','#132D43']):
   y=140+row*270;d.rectangle((x,y,x+372,y+245),fill=bg);place(b,sp,(x+(372-sp.width*2)//2,y+8),2);place(b,sp,(x+10,y+245-sp.height))
   d.text((x+8,y+4),'2×',font=font(12),fill='#143D48' if row==0 else '#DFE9D7')
 d.text((24,718),'Xoáy mai / gờ sóng / ấn trán giữ cùng dòng; III mới có điểm sáng cyan chọn lọc.',font=font(17),fill='#B7C8C7');b.save(ROOT/'lineage-light-dark-check.png')
 b=panel((1080,540),'BẬC I — MỘT KEY POSE BƠI','Mẫu tĩnh idle → swim, không chuỗi animation hoặc timing gameplay')
 d=ImageDraw.Draw(b)
 for i,(pose,label) in enumerate([('idle','Nghỉ'),('swim','Thu / đạp vây')]):
  x=24+i*525;d.rectangle((x,110,x+500,470),fill='#244854');place(b,sprite(size=(64,80),pose=pose),(x+85,125),4);d.text((x+85,486),label,font=font(19),fill='#E6EBD7')
 b.save(ROOT/'swim-key-comparison.png')
 # Metadata đo, không production manifest. Đệm2px chỉ là tiêu chí thăm dò.
 stats=[]
 for p in sorted(ROOT.glob('*.png')):
  if '-comparison' in p.stem or p.stem=='lineage-light-dark-check':continue
  im=Image.open(p);bb=im.getchannel('A').getbbox();colors={im.getpixel((x,y)) for y in range(im.height) for x in range(im.width) if im.getpixel((x,y))[3]}
  stats.append({'file':p.name,'size':list(im.size),'anchor':[im.width//2,im.height//2],'bounds':list(bb),'opaqueColors':len(colors),'margin2':bb[0]>=2 and bb[1]>=2 and bb[2]<=im.width-2 and bb[3]<=im.height-2})
 (ROOT/'measurements.json').write_text(json.dumps({'nonproduction':True,'palette':HEX,'studies':stats},ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(stats))
if __name__=='__main__':main()
