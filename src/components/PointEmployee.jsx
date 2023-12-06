import React from "react";
import { FiStar } from "react-icons/fi";

export default function PointEmployee({ point }) {
    return (
        <div>
            <div>
                <div className="flex items-center">
                    <FiStar className="h-12 w-12 py-[10px]" />
                    <p className="font-semibold">{point}</p>
                </div>
            </div>
        </div>
    );
}
