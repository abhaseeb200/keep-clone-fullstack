import React from "react";
import {
    ColorIcon,
    NoColorIcon,
    NoImageIcon,
    TickIconWithBG,
    Tooltip,
} from "@/Components/Icons";

const colorOptions = [
    { title: "Coral", code: "#faafa8" },
    { title: "Peach", code: "#f39f76" },
    { title: "Sand", code: "#fff8b8" },
    { title: "Mint", code: "#e2f6d3" },
    { title: "Sage", code: "#b4ddd3" },
    { title: "Fog", code: "#d4e4ed" },
    { title: "Storm", code: "#aeccdc" },
    { title: "Dusk", code: "#d3bfdb" },
    { title: "Blossom", code: "#f6e2dd" },
    { title: "Clay", code: "#e9e3d4" },
    { title: "Chalk", code: "#efeff1" },
];

const imageOptions = [
    { title: "Groceries", url: "/backgrounds/grocery.svg" },
    { title: "Food", url: "/backgrounds/food.svg" },
    { title: "Music", url: "/backgrounds/music.svg" },
    { title: "Recipe", url: "/backgrounds/recipe.svg" },
    { title: "Notes", url: "/backgrounds/notes.svg" },
    { title: "Places", url: "/backgrounds/places.svg" },
    { title: "Travel", url: "/backgrounds/travel.svg" },
    { title: "Video", url: "/backgrounds/video.svg" },
    { title: "Celebration", url: "/backgrounds/celebration.svg" },
];

function BackgroundOptions({
    isOpen,
    setIsOpen,
    handleBackgroundOption,
    data = [],
}) {
    return (
        <div className="relative">
            <ColorIcon
                className="bg-soft-with-hover size-9"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute top-8 -left-7 shadow-xl px-3 py-2.5 rounded-lg bg-white z-10">
                    {/* ============ COLORS ============*/}
                    <div className="flex gap-1 flex-row items-center pb-2 border-b justify-between">
                        <div
                            className="group/tooltip cursor-pointer size-8 flex justify-center items-center relative border-[2.3px] border-[#a142f4] rounded-full"
                            // FOR COLORS. USED KEY 'CODE'
                            onClick={() =>
                                handleBackgroundOption({ code: "#fff" }, data)
                            }
                        >
                            <TickIconWithBG className="absolute -top-1.5 -right-2 size-4 bg-[#a142f4] rounded-full fill-white" />
                            <NoColorIcon
                                className="size-[17px]"
                                title="Default"
                            />
                        </div>

                        {colorOptions.map((i, index) => (
                            <div
                                className="flex rounded-full relative group/tooltip"
                                key={index}
                                onClick={() => handleBackgroundOption(i, data)}
                            >
                                <span
                                    className="size-8 rounded-full cursor-pointer border-[2.3px] hover:!border-black"
                                    style={{
                                        background: i?.code,
                                        borderColor: `${i.code}`,
                                    }}
                                ></span>
                                <Tooltip title={i?.title} />
                            </div>
                        ))}
                    </div>

                    {/* ============ IMAGES ============*/}
                    <div className="flex gap-1 flex-row items-center pt-2 border-t">
                        <div
                            // FOR COLORS. USED KEY 'CODE'
                            onClick={() =>
                                handleBackgroundOption({ code: "#fff" }, data)
                            }
                            className="cursor-pointer group/tooltip size-10 p-1 flex justify-center items-center relative border-[2.3px] border-[#a142f4] rounded-full"
                        >
                            <TickIconWithBG className="absolute -top-1.5 -right-2 size-4 bg-[#a142f4] rounded-full fill-white" />
                            <NoImageIcon title="Default" className="size-6" />
                        </div>

                        {imageOptions.map((i, index) => (
                            <div
                                key={index}
                                className="flex rounded-full relative group/tooltip"
                                onClick={() => handleBackgroundOption(i, data)}
                            >
                                <span
                                    className="size-10 rounded-full cursor-pointer border-[2.3px] hover:border-black"
                                    style={{
                                        backgroundImage: `url(${i.url})`,
                                    }}
                                ></span>
                                <Tooltip title={i?.title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BackgroundOptions;