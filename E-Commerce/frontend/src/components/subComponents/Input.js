import React from "react";

export default function Input({ inputs, setInputs, label, name, value }) {
    const handleChange = (e) => {
        const state = { ...inputs };
        const name = e.target.name;
        state[name] = e.target.value;

        setInputs(state);
    };

    return (
        <div>
            <label className="text-gray-700">{label}</label>
            <input
                type="text"
                className="mt-1 block w-full input"
                value={value}
                name={name}
                onChange={(e) => handleChange(e)}
                required
            />
        </div>
    );
}
