import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function LoadingOverlay({
    size,
    color = "white",
    className = "",
}: {
    size: number;
    color?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "absolute z-30 inset-0 bg-black/40 rounded-[12px] w-full h-full",
                className
            )}
        >
            <div className="w-full h-full flex items-center justify-center">
                <motion.span className="absolute animate-rotateL w-max h-max">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width={size}
                        height={size}
                        style={{
                            shapeRendering: "auto",
                            display: "block",
                            background: "transparent",
                        }}
                    >
                        <g data-idx={1}>
                            <circle
                                strokeDasharray="164.93361431346415 56.97787143782138"
                                r={35}
                                strokeWidth={6}
                                stroke={color}
                                fill="none"
                                cy={50}
                                cx={50}
                                data-idx={2}
                            ></circle>
                            <g data-idx={4} />
                        </g>
                    </svg>
                </motion.span>
            </div>
        </div>
    );
}
