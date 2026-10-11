from pathlib import Path
from xml.sax.saxutils import escape
out=Path(__file__).resolve().parent.parent/'public/images'
out.mkdir(exist_ok=True)

def wrap(content, bg1='#e8e5df', bg2='#d2cbc1', tag='KONZEPTVISUALISIERUNG',title='ATELIER HAUS / DEMO'):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1050" viewBox="0 0 1600 1050" role="img" aria-label="{escape(title)}">
 <defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="{bg1}"/><stop offset="1" stop-color="{bg2}"/></linearGradient><filter id="shadow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="22"/></filter></defs>
 <rect width="1600" height="1050" fill="url(#bg)"/>
 {content}
 <rect x="52" y="54" width="260" height="38" rx="4" fill="#262824" opacity=".88"/><text x="70" y="80" font-family="Arial,sans-serif" font-size="18" fill="white" letter-spacing="3">DEMO · {tag[:16]}</text>
 <text x="58" y="997" font-family="Arial,sans-serif" font-size="18" letter-spacing="3" fill="#454842">{escape(title)}</text>
 <text x="1542" y="997" text-anchor="end" font-family="Arial,sans-serif" font-size="17" fill="#454842">KEINE ECHTE OBJEKTAUFNAHME</text>
 </svg>'''

def external(family=False):
 green='#82937a' if family else '#748278'
 return f'''<rect x="0" y="720" width="1600" height="330" fill="#aaaca0" opacity=".52"/>
 <circle cx="1310" cy="220" r="92" fill="#f1e8d2" opacity=".85"/>
 <path d="M0 710 L340 710 L510 650 L1060 650 L1220 720 L1600 720" fill="#bbbcaf" opacity=".4"/>
 <path d="M230 650 L470 400 L920 400 L1100 550 L1100 826 L230 826 Z" fill="#eeeae2"/>
 <path d="M470 400 L620 280 L1080 510 L920 400Z" fill="#d0cbc2"/>
 <path d="M920 400 L1170 330 L1370 565 L1100 550Z" fill="#a9a79f"/>
 <path d="M1100 550L1370 565L1370 825L1100 826Z" fill="#d4d0c8"/>
 <rect x="325" y="560" width="425" height="266" fill="#5d6460"/><rect x="348" y="580" width="381" height="230" fill="#929d98"/>
 <rect x="768" y="516" width="220" height="310" fill="#6c7370"/><rect x="791" y="536" width="176" height="273" fill="#a7b3ac"/>
 <rect x="1155" y="605" width="145" height="215" fill="#5e6662"/><rect x="1173" y="623" width="109" height="178" fill="#afbbb2"/>
 <rect x="300" y="828" width="940" height="27" fill="#b7aca0"/>
 <ellipse cx="1280" cy="870" rx="220" ry="30" fill="#737567" opacity=".2"/>
 <path d="M130 820Q140 730 160 610M154 750L95 698M155 690L218 630" fill="none" stroke="#676e63" stroke-width="22"/>
 <circle cx="145" cy="574" r="104" fill="{green}" opacity=".85"/><circle cx="75" cy="650" r="77" fill="{green}" opacity=".8"/><circle cx="221" cy="653" r="75" fill="{green}" opacity=".77"/>
 <path d="M1385 820v-180m0 80-67-48m67-24 67-61" fill="none" stroke="#75796a" stroke-width="18"/>
 <circle cx="1390" cy="570" r="87" fill="{green}"/><circle cx="1333" cy="643" r="64" fill="{green}"/><circle cx="1450" cy="650" r="64" fill="{green}"/>
 {('<rect x="580" y="845" width="300" height="30" rx="10" fill="#a18873"/><circle cx="530" cy="855" r="39" fill="#6f8568"/><circle cx="921" cy="859" r="47" fill="#7c916f"/>' if family else '<rect x="800" y="845" width="330" height="18" fill="#a9a098"/>')}'''

def interior(type='wohnen',family=False):
 wall='#e2dcd1' if family else '#e9e6df'; wall2='#cec3b2' if family else '#cbc8c1'; accent='#a8876d' if family else '#8d9186'
 base=f'''<path d="M0 0H1600V756H0Z" fill="{wall}"/><path d="M0 756H1600V1050H0Z" fill="#b2a99d"/><path d="M0 756 L760 697 L1600 756" fill="none" stroke="#d4d0c8" stroke-width="8"/>
 <rect x="890" y="113" width="475" height="525" fill="#f8f5ed"/><rect x="913" y="137" width="430" height="475" fill="#a7b7b1"/><path d="M910 490 L1345 350V615H910" fill="#829b8c" opacity=".6"/><path d="M1119 137V615" stroke="#eeeae2" stroke-width="17"/>
 <path d="M120 126H645V688H120Z" fill="{wall2}" opacity=".65"/><path d="M143 154H620V663H143Z" fill="{wall}"/>
 <rect x="0" y="755" width="1600" height="17" fill="#978c7f" opacity=".45"/>'''
 if type=='kueche':
  base += f'''<rect x="70" y="490" width="575" height="315" fill="#b5b3aa"/><rect x="70" y="460" width="575" height="44" fill="#f6f1e8"/>
 <rect x="118" y="530" width="145" height="235" fill="#e4dfd5"/><rect x="280" y="530" width="160" height="235" fill="#dbd5c9"/><rect x="454" y="530" width="145" height="235" fill="#e7e1d7"/>
 <path d="M544 700H1130L1170 833H498Z" fill="#f2efe8"/><rect x="545" y="820" width="585" height="125" fill="{accent}"/>
 <rect x="605" y="847" width="152" height="68" fill="#e4ded4"/><rect x="787" y="847" width="152" height="68" fill="#e4ded4"/>
 <path d="M679 170V350m0 0q0 130-77 130h154q-77 0-77-130" stroke="#777870" stroke-width="13" fill="none"/><path d="M893 140V340m0 0q0 145-77 145h154q-77 0-77-145" stroke="#777870" stroke-width="13" fill="none"/>
 <circle cx="1110" cy="787" r="25" fill="#615e54"/><ellipse cx="1110" cy="761" rx="70" ry="10" fill="#877e70"/>'''
 elif type=='unterbau':
  base+='''<path d="M200 272H760V760H200Z" fill="#aaa99e"/><path d="M218 300H740V739H218Z" fill="#e2ddd3"/>
 <rect x="250" y="555" width="480" height="140" rx="15" fill="#7a857a"/><rect x="300" y="500" width="420" height="80" rx="28" fill="#a3aba0"/>
 <rect x="935" y="650" width="330" height="140" fill="#aa957f"/><rect x="980" y="540" width="40" height="112" fill="#7e856f"/><circle cx="1000" cy="505" r="65" fill="#778c76"/>
 <path d="M1270 625V320" stroke="#54574f" stroke-width="14"/><path d="M1200 332Q1270 265 1340 332" fill="none" stroke="#e8e1d4" stroke-width="18"/>'''
 elif type=='zimmer':
  base+='''<rect x="270" y="545" width="680" height="240" rx="38" fill="#b7a493"/><rect x="310" y="505" width="630" height="140" rx="65" fill="#e9ddd0"/>
 <rect x="335" y="520" width="225" height="70" rx="32" fill="#eee9db"/><rect x="590" y="520" width="220" height="70" rx="32" fill="#ede6d9"/>
 <rect x="995" y="725" width="180" height="80" fill="#a58b72"/><circle cx="1080" cy="672" r="66" fill="#c7ae8e"/><rect x="158" y="390" width="100" height="340" fill="#bdaf9c"/>
 <path d="M185 430v-200" stroke="#5e6559" stroke-width="10"/><circle cx="184" cy="224" r="40" fill="#879781"/>'''
 elif type=='detail':
  base+='''<rect x="75" y="300" width="350" height="460" fill="#aaa79f"/><rect x="108" y="330" width="282" height="390" fill="#dbd6cb"/>
 <ellipse cx="680" cy="732" rx="288" ry="75" fill="#736f64" opacity=".28"/><rect x="490" y="550" width="400" height="163" rx="17" fill="#787e76"/><rect x="535" y="480" width="340" height="104" rx="35" fill="#a4aba0"/>
 <rect x="1060" y="570" width="270" height="210" fill="#a18a72"/><rect x="1090" y="350" width="26" height="225" fill="#79836f"/><ellipse cx="1102" cy="324" rx="78" ry="110" fill="#8f9b86"/>'''
 else:
  base+=f'''<rect x="212" y="566" width="700" height="200" rx="36" fill="{accent}"/><rect x="232" y="483" width="660" height="161" rx="46" fill="{('#d7c6b4' if family else '#b6bbb2')}"/>
 <rect x="255" y="496" width="189" height="95" rx="34" fill="#e5ddd0"/><rect x="473" y="496" width="176" height="96" rx="34" fill="#d1c6b8"/>
 <ellipse cx="745" cy="848" rx="280" ry="55" fill="#908477" opacity=".35"/><ellipse cx="746" cy="783" rx="221" ry="45" fill="#d4c4b0"/><rect x="685" y="795" width="120" height="73" fill="#8b7763"/>
 <rect x="1375" y="485" width="35" height="290" fill="#8d8477"/><ellipse cx="1394" cy="477" rx="104" ry="45" fill="#d4c8b4"/>
 <rect x="92" y="650" width="85" height="125" rx="8" fill="#9a806c"/><path d="M132 630V445" stroke="#6c7769" stroke-width="13"/><circle cx="125" cy="433" r="80" fill="#7f927c"/>'''
 return base

for variant in ['modern','familie']:
 family=variant=='familie'
 for scene in ['aussen','wohnen','kueche','unterbau']+(['zimmer'] if family else ['detail']):
  if scene=='aussen': body=external(family)
  else: body=interior(scene,family)
  (out/f'{variant}-{scene}.svg').write_text(wrap(body,'#e1d8cd' if family else '#e8e9e5','#c0b6a9' if family else '#b7bfba',title=f'ATELIER HAUS / WOHNIDEE {variant.upper()}'),encoding='utf8')

plan='''<rect x="0" y="0" width="1600" height="1050" fill="#f6f4ee"/>
 <g transform="translate(245 167)" stroke="#525c59" stroke-width="16" fill="none">
 <rect x="0" y="0" width="1110" height="675"/><path d="M500 0V675M500 350H1110M0 470H500M800 350V675"/>
 <path d="M500 130H800V350M800 130H1110" stroke-width="8"/><path d="M180 470V675" stroke-width="8"/>
 <path d="M0 170Q170 170 170 0M500 505Q650 505 650 350M800 530Q935 530 935 675" stroke="#c7b59f" stroke-width="6"/>
 </g>
 <g font-family="Arial,sans-serif" font-size="28" fill="#626c68" text-anchor="middle"><text x="490" y="420">WOHNEN / ESSEN</text><text x="1020" y="420">KÜCHE</text><text x="490" y="740">TERRASSE</text><text x="880" y="760">ZIMMER</text><text x="1200" y="760">NEBENRAUM</text></g>
 <text x="800" y="105" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" letter-spacing="5" fill="#525c59">SCHEMATISCHES BEISPIEL · NICHT MASSSTÄBLICH</text>
 <text x="800" y="946" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#6e746e">Keine realen Grundrissdaten hinterlegt · Zur Demonstration der Ansicht</text>'''
(out/'demo-plan.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1050" viewBox="0 0 1600 1050" role="img" aria-label="Schematischer Demonstrationsgrundriss">'+plan+'</svg>',encoding='utf8')
(out/'location-placeholder.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" fill="#e5e8e2"/><path d="M-50 400L1200 60M0 670L970-20M110 0L780 720M720-50L1150 700" stroke="#fff" stroke-width="82"/><path d="M-50 400L1200 60M0 670L970-20M110 0L780 720M720-50L1150 700" stroke="#cbd2c9" stroke-width="3"/><path d="M80 520L240 470L360 550L310 660L140 640Z" fill="#c4d3bb"/><path d="M720 95L840 70L950 155L885 255L747 212Z" fill="#c4d3bb"/><rect x="180" y="280" width="840" height="140" rx="8" fill="#2b322d" opacity=".92"/><text x="600" y="342" text-anchor="middle" fill="#fff" font-size="33" font-family="Arial,sans-serif" letter-spacing="2">STANDORT NOCH NICHT HINTERLEGT</text><text x="600" y="387" text-anchor="middle" fill="#e0e3dd" font-size="21" font-family="Arial,sans-serif">Neutrale Standortgrafik · kein tatsächlicher Kartenausschnitt</text></svg>''',encoding='utf8')
(out/'brand-mark.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#2c332d" d="M8 31 32 10l24 21v26H8z"/><path fill="#faf9f6" d="M21 34h22v23H21z"/><path fill="#9b8b73" d="M27 40h10v17H27z"/></svg>''',encoding='utf8')
print('generated',len(list(out.glob('*.svg'))),'illustrations')
