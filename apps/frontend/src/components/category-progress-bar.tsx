const COLORS = [
    "#D7263D", // red
    "#F9A602", // yellow
    "#1FAA59", // green
    "#119DA4", // teal
    "#0C356A", // dark blue
    "#0081A7", // blue
    "#6C2EB7", // purple
];

interface CategoryProgressBarProps {
    categories: { name: string; percentage: number }[];
}

const CIRCLE_SIZE = 60;
const STROKE_WIDTH = 6;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CategoryProgressBar({ categories }: CategoryProgressBarProps) {
    return (
        <div className="bg-[#111] rounded-2xl p-2 px-3 flex gap-3 justify-center items-center shadow-[0_7px_0_#bbb]">
            {categories.slice(0, 7).map(({ name, percentage }, i) => {
                const dash = (percentage / 100) * CIRCUMFERENCE;
                return (
                    <svg
                        key={name}
                        width={CIRCLE_SIZE}
                        height={CIRCLE_SIZE}
                        viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
                        className="block"
                        role="img"
                        aria-label={`${name} progress: ${percentage}%`}
                    >
                        <title>{`${name} progress: ${percentage}%`}</title>
                        {/* Background circle */}
                        <circle
                            cx={CIRCLE_SIZE / 2}
                            cy={CIRCLE_SIZE / 2}
                            r={RADIUS}
                            stroke="#fff"
                            strokeWidth={STROKE_WIDTH}
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx={CIRCLE_SIZE / 2}
                            cy={CIRCLE_SIZE / 2}
                            r={RADIUS}
                            stroke={COLORS[i]}
                            strokeWidth={STROKE_WIDTH}
                            fill="none"
                            strokeDasharray={CIRCUMFERENCE}
                            strokeDashoffset={CIRCUMFERENCE - dash}
                            strokeLinecap="round"
                            style={{
                                transition: "stroke-dashoffset 0.5s",
                                transform: "rotate(-90deg)",
                                transformOrigin: "50% 50%",
                            }}
                        />
                        {/* Percentage text */}
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="fill-white text-[1.1rem] font-bold"
                        >
                            {percentage}%
                        </text>
                    </svg>
                );
            })}
        </div>
    );
}

export default CategoryProgressBar;
