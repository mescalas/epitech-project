import { React } from "react";

export default function Toggle({ id, toggleState, setToggle }) {
    return (
        <label htmlFor={id} className="flex items-center cursor-pointer">
            {/* <!-- toggle --> */}
            <div className="relative">
                {/* <!-- input --> */}
                <input
                    type="checkbox"
                    id={id}
                    className="sr-only"
                    onClick={() => setToggle(!toggleState)}
                />
                {/* <!-- line --> */}
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                {/* <!-- dot --> */}
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>
        </label>
    );
}
