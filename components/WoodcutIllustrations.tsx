// 统一报纸版画木刻风格 SVG 组件
// 墨黑 #1A1A1A + 透明底（继承 paper #F4F4F0），刀刻粗线 + hatching 阴影

type IconProps = {
  className?: string;
  width?: number;
  height?: number;
};

/* ------------------------------------------------------------------ */
/* UI 小图标（viewBox 0 0 24 24，stroke-width 2，currentColor）        */
/* ------------------------------------------------------------------ */

export function HomeIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <defs>
        <pattern
          id="woodcut-home-hatch"
          patternUnits="userSpaceOnUse"
          width="3"
          height="3"
          patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="1.5" height="3" fill="currentColor" />
        </pattern>
      </defs>
      {/* 坡屋顶（三角）+ hatching 阴影 */}
      <path d="M2 12 L12 3 L22 12 Z" fill="url(#woodcut-home-hatch)" />
      {/* 屋身 */}
      <rect x="5" y="12" width="14" height="9" />
      {/* 门洞（实心） */}
      <rect x="10" y="15" width="4" height="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* 箭头（实心三角，朝左） */}
      <path d="M3 12 L11 6 L11 18 Z" fill="currentColor" stroke="none" />
      {/* 箭杆 */}
      <line x1="11" y1="12" x2="21" y2="12" />
      {/* 箭杆上方 hatching 短斜线（刀刻纹理） */}
      <line x1="12" y1="9" x2="14" y2="12" />
      <line x1="15" y1="9" x2="17" y2="12" />
      <line x1="18" y1="9" x2="20" y2="12" />
    </svg>
  );
}

export function MenuIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* 不等长刀刻三横，左对齐，从上到下渐短 */}
      <line x1="2" y1="7" x2="22" y2="7" />
      <line x1="2" y1="12" x2="18" y2="12" />
      <line x1="2" y1="17" x2="14" y2="17" />
    </svg>
  );
}

export function XIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* 两条交叉粗线 */}
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
      {/* 交点小方块装饰，增强木刻感 */}
      <rect x="10.5" y="10.5" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 栏目插画（viewBox 0 0 120 120，stroke-width 3，固定 #1A1A1A）       */
/* ------------------------------------------------------------------ */

export function BookWoodcut({ className, width = 120, height = 120 }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth={3}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <defs>
        <pattern
          id="woodcut-book-hatch"
          patternUnits="userSpaceOnUse"
          width="5"
          height="5"
          patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="2" height="5" fill="#1A1A1A" />
        </pattern>
      </defs>
      {/* 桌面投影（hatching） */}
      <path d="M16 84 L104 84 L110 90 L10 90 Z" fill="url(#woodcut-book-hatch)" stroke="none" />
      {/* 左页 */}
      <path d="M57 26 L18 36 L18 80 L57 84 Z" />
      {/* 右页 */}
      <path d="M63 26 L102 36 L102 80 L63 84 Z" />
      {/* 书脊（实心黑条） */}
      <rect x="57" y="26" width="6" height="58" fill="#1A1A1A" stroke="none" />
      {/* 左页文字 hatching（横线） */}
      <line x1="24" y1="46" x2="52" y2="46" strokeWidth={1.5} />
      <line x1="24" y1="52" x2="52" y2="52" strokeWidth={1.5} />
      <line x1="24" y1="58" x2="52" y2="58" strokeWidth={1.5} />
      <line x1="24" y1="64" x2="52" y2="64" strokeWidth={1.5} />
      <line x1="24" y1="70" x2="52" y2="70" strokeWidth={1.5} />
      <line x1="26" y1="76" x2="50" y2="76" strokeWidth={1.5} />
      {/* 右页文字 hatching（横线） */}
      <line x1="68" y1="46" x2="96" y2="46" strokeWidth={1.5} />
      <line x1="68" y1="52" x2="96" y2="52" strokeWidth={1.5} />
      <line x1="68" y1="58" x2="96" y2="58" strokeWidth={1.5} />
      <line x1="68" y1="64" x2="96" y2="64" strokeWidth={1.5} />
      <line x1="68" y1="70" x2="96" y2="70" strokeWidth={1.5} />
      <line x1="70" y1="76" x2="94" y2="76" strokeWidth={1.5} />
      {/* 桌面线 */}
      <line x1="8" y1="92" x2="112" y2="92" strokeWidth={2} />
    </svg>
  );
}

export function PenWoodcut({ className, width = 120, height = 120 }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth={3}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <defs>
        <pattern
          id="woodcut-pen-hatch"
          patternUnits="userSpaceOnUse"
          width="5"
          height="5"
          patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="2" height="5" fill="#1A1A1A" />
        </pattern>
      </defs>
      {/* 钢笔笔杆（hatching 阴影） */}
      <path
        d="M95 27 L30 78 L23 86 L88 35 Z"
        fill="url(#woodcut-pen-hatch)"
      />
      {/* 笔杆中线（刀痕） */}
      <line x1="91" y1="31" x2="27" y2="82" strokeWidth={1.5} />
      {/* 笔尖（实心三角，朝下左） */}
      <path d="M30 78 L23 86 L16 92 Z" fill="#1A1A1A" />
      {/* 笔尖缝（留白） */}
      <line x1="16" y1="92" x2="25" y2="83" stroke="#F4F4F0" strokeWidth={1.5} />
      {/* 墨水瓶身轮廓 */}
      <rect x="72" y="74" width="26" height="26" />
      {/* 瓶身左侧 hatching 阴影 */}
      <rect x="72" y="74" width="16" height="26" fill="url(#woodcut-pen-hatch)" stroke="none" />
      {/* 瓶身右侧实心阴影 */}
      <rect x="88" y="74" width="10" height="26" fill="#1A1A1A" stroke="none" />
      {/* 反光高光（留白小块） */}
      <rect x="76" y="78" width="4" height="4" fill="#F4F4F0" stroke="none" />
      {/* 瓶身标签横线 */}
      <line x1="72" y1="88" x2="98" y2="88" strokeWidth={1.5} />
      {/* 瓶颈 */}
      <rect x="82" y="66" width="8" height="8" />
      {/* 瓶口（实心黑） */}
      <rect x="83" y="63" width="6" height="4" fill="#1A1A1A" stroke="none" />
      {/* 墨水溅滴 */}
      <circle cx="12" cy="98" r="2" fill="#1A1A1A" stroke="none" />
      <circle cx="19" cy="103" r="1.5" fill="#1A1A1A" stroke="none" />
      <circle cx="7" cy="93" r="1.2" fill="#1A1A1A" stroke="none" />
      {/* 桌面线 */}
      <line x1="8" y1="106" x2="112" y2="106" strokeWidth={2} />
    </svg>
  );
}

export function EnvelopeWoodcut({ className, width = 120, height = 120 }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth={3}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <defs>
        <pattern
          id="woodcut-envelope-hatch"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="2" height="4" fill="#1A1A1A" />
        </pattern>
      </defs>
      {/* 信封主体 */}
      <rect x="20" y="44" width="80" height="48" />
      {/* 信封翻盖（三角） */}
      <line x1="20" y1="44" x2="60" y2="68" />
      <line x1="100" y1="44" x2="60" y2="68" />
      {/* 地址行（细 hatching） */}
      <line x1="38" y1="78" x2="80" y2="78" strokeWidth={1.5} />
      <line x1="38" y1="84" x2="68" y2="84" strokeWidth={1.5} />
      {/* 邮戳（右上角圆形）—— 外圈 hatching 阴影 */}
      <circle cx="92" cy="34" r="13" fill="url(#woodcut-envelope-hatch)" />
      {/* 邮戳内圈（留白） */}
      <circle cx="92" cy="34" r="8" fill="#F4F4F0" strokeWidth={1.5} />
      {/* 邮戳日期数字 */}
      <text
        x="92"
        y="38"
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#1A1A1A"
        stroke="none"
        fontFamily="ui-monospace, 'Courier New', monospace"
      >
        24
      </text>
      {/* 封蜡（左上角实心圆） */}
      <circle cx="32" cy="46" r="8" fill="#1A1A1A" stroke="none" />
      {/* 封蜡十字纹（留白） */}
      <line x1="24" y1="46" x2="40" y2="46" stroke="#F4F4F0" strokeWidth={1.5} />
      <line x1="32" y1="38" x2="32" y2="54" stroke="#F4F4F0" strokeWidth={1.5} />
    </svg>
  );
}
