import { useState } from "react";
import {
    ArchivedIcon,
    ColorIcon,
    CrossIcon,
    ImageUploadIcon,
    LabelIcon,
    PinIcon,
    TickIcon,
    TrashIcon,
} from "@/Components/Icons";
import LabelSelect from "@/Components/LabelSelect";
import BackgroundOptions from "@/Components/BackgroundOptions";

const Card = ({
    data,
    handleOnSelect,
    selectMultiple,
    handlePin,
    handleTrash,
    handleArchived,
    handleSelectLabels,
    handleLabelToggle,
    handleRemoveLabel,
    currentId,
    setCurrentId,
    handleUpdateBackgroundOption,
}) => {
    const [isBackgroundOptionOpen, setIsBackgroundOptionOpen] = useState(false);
    let isSelected = selectMultiple?.some((i) => i?.id == data?.id);

    return (
        <div className="relative">
            <div
                className={`${
                    isSelected ? "border-gray-900" : "border-gray-200"
                } group border p-3 bg-white rounded-lg relative hover:shadow-lg`}
                style={{
                    background: data?.background.includes("background")
                        ? `url(${data.background})`
                        : data.background,
                }}
            >
                {/* ============= SELECTED ICON =============*/}
                <div className="absolute -top-2 -left-2 cursor-pointer">
                    <TickIcon
                        className={`${isSelected ? "flex" : "show-on-hover"}`}
                        onClick={() => handleOnSelect(data)}
                    />
                </div>

                {/* ============= CONTENT =============*/}
                <div>
                    <div className="font-medium text-lg flex justify-between mb-2">
                        {data?.title}
                        <PinIcon
                            onClick={() => handlePin(data)}
                            className={`${
                                isSelected ? "flex" : "show-on-hover"
                            } cursor-pointer hover:bg-gray-200 size-10 -mt-2 rounded-full p-2`}
                        />
                    </div>
                    <div className="text-sm">{data?.content}</div>
                </div>

                {/* ============= LABELS =============*/}
                <div className="mt-7 flex gap-2 flex-wrap">
                    {data?.labels?.map((label, index) => (
                        <div
                            key={index}
                            className="relative group/edit flex items-center gap-0.5 bg-gray-200 h-6 px-3 rounded-xl text-xs opacity-75"
                        >
                            <span className="group-hover/edit:-translate-x-1.5">
                                {label?.name}
                            </span>
                            <CrossIcon
                                onClick={() => handleRemoveLabel(label, data)}
                                className="absolute right-0 group-hover/edit:block hidden size-4 mt-0.5 cursor-pointer hover:bg-slate-400 rounded-full p-0.5"
                            />
                        </div>
                    ))}
                </div>

                {/* ============= OPTIONS - SHOW ON HOVER =============*/}
                <div className="flex gap-2 mt-2 show-on-hover">
                    <BackgroundOptions
                        isOpen={isBackgroundOptionOpen}
                        setIsOpen={setIsBackgroundOptionOpen}
                        data={data}
                        handleBackgroundOption={handleUpdateBackgroundOption}
                    />
                    <ImageUploadIcon className="bg-soft-with-hover size-9" />
                    <ArchivedIcon
                        onClick={() => handleArchived(data)}
                        className="bg-soft-with-hover size-9"
                    />
                    <LabelIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLabelToggle(data);
                        }}
                        className="bg-soft-with-hover size-9"
                    />
                    <TrashIcon
                        onClick={() => handleTrash(data)}
                        className="bg-soft-with-hover size-9"
                    />
                </div>
            </div>

            <LabelSelect
                className="absolute top-auto -right-24"
                note={data}
                currentId={currentId}
                setCurrentId={setCurrentId}
                handleSelectLabels={handleSelectLabels}
            />
        </div>
    );
};

export default Card;
