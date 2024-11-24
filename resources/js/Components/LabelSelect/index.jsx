import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SearchIcon } from "@/Components/Icons";
import useClickOutside from "@/Hooks/useClickOutside";

const LabelSelect = ({
    className,
    note,
    handleSelectLabels,
    currentId,
    setCurrentId,
}) => {
    const [labelsCopy, setLabelsCopy] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const { labels } = useSelector((state) => state?.label);

    const containerRef = useRef(null);

    useClickOutside(containerRef, () => setCurrentId(null));

    const handleSearchValue = (event) => {
        let value = event.target.value;
        let newSearchItems;
        setSearchValue(value);

        if (value.trim()) {
            newSearchItems = labels.filter((i) =>
                i?.name?.toLowerCase().includes(value.toLowerCase().trim())
            );
        } else {
            newSearchItems = [...labels];
        }

        setLabelsCopy(newSearchItems);
    };

    useEffect(() => {
        setLabelsCopy(labels);
    }, [labels]);

    return (
        <>
            {currentId == note?.id && (
                <div
                    ref={containerRef}
                    className={`bg-white shadow-lg min-w-52 ${className}`}
                >
                    <h3 className="text-sm font-medium pb-1 p-2">
                        Labels notes {note?.id}
                    </h3>

                    <div className="w-full max-w-md flex flex-col gap-1">
                        {/* ================= SEARCH INPUT ================= */}
                        <div className="relative flex justify-between gap-2 items-center mb-2 p-2">
                            <input
                                type="text"
                                name="search"
                                value={searchValue}
                                placeholder="Enter label name  "
                                onChange={handleSearchValue}
                                className="text-sm outline-none"
                            />
                            <SearchIcon className="size-[14px] text-gray-500" />
                        </div>

                        {/* ================= LABELS ================= */}
                        <div className="max-h-48 overflow-auto flex flex-col">
                            {labelsCopy?.map((label, index) => (
                                <div key={index}>
                                    <label className="px-2 py-[3px] hover:bg-gray-100 w-full cursor-pointer inline-flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox size-3 text-gray-600"
                                            checked={note?.labels?.some((i) => i?.id == label?.id)}
                                            onChange={() =>
                                                handleSelectLabels(label, note)
                                            }
                                        />
                                        <span className="ml-2 text-gray-700">
                                            {label?.name}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LabelSelect;