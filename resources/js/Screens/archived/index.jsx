import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-layout-masonry";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { getNotesReducer } from "@/Features/note/noteSlice";
import Card from "@/Components/Card";
import CardModal from "@/Components/CardModal";
import useNotes from "@/Hooks/useNotes";
import useLabels from "@/Hooks/useLabels";

const Archived = () => {
    const [sortingOther, setSortingOther] = useState([]); // Used for with-out pinned drag-and-drop notes
    const [selectedModalNote, setSelectedModalNote] = useState({});
    const [isOpenNote, setIsOpenNote] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [selectMultiple, setSelectMultiple, isListView] = useOutletContext();

    const { notes } = useSelector((state) => state?.note);

    const dispatch = useDispatch();

    const { getNotes } = useNotes();
    const { getLabels } = useLabels();

    useEffect(() => {
        async function fetchNotes() {
            await getNotes();
        }
        async function fetchLabels() {
            await getLabels();
        }

        fetchLabels();
        fetchNotes();
        if (!notes?.length) {
        }
    }, []);

    useEffect(() => {
        //Used for the purpose of update current-note data in the modal
        setSelectedModalNote(
            notes.find((note) => note?.id == selectedModalNote?.id)
        );

        //Used for the purpose of drag-and-drop others items
        setSortingOther(
            notes.filter((note) => note?.isArchived).map((note) => note?.id)
        );
    }, [notes]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setSortingOther((prev) => {
                const oldIndex = prev.indexOf(active.id);
                const newIndex = prev.indexOf(over.id);
                const newOrder = arrayMove(prev, oldIndex, newIndex);

                const sortedNotes = newOrder.map((orderId) =>
                    notes.find((note) => note.id === orderId)
                );

                dispatch(getNotesReducer([...sortedNotes]));
                return newOrder;
            });
        }
    };

    const handleLabelToggle = (data) => {
        setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    return (
        <div className="mt-8">
            {/* ============== MASONRY NOTES CARDS ============== */}
            {sortingOther?.length ? (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={sortingOther}>
                        <Masonry
                            columns={{ 640: 1, 768: 2, 1024: 4, 1366: 5 }}
                            gap={16}
                        >
                            {sortingOther.map((id) => {
                                const note = notes.find(
                                    (note) => note.id === id
                                );
                                return (
                                    <Card
                                        key={note?.id}
                                        data={note}
                                        currentId={currentId}
                                        setCurrentId={setCurrentId}
                                        selectMultiple={selectMultiple}
                                        handleLabelToggle={handleLabelToggle}
                                        setSelectedModalNote={
                                            setSelectedModalNote
                                        }
                                        setIsOpenNote={setIsOpenNote}
                                    />
                                );
                            })}
                        </Masonry>
                    </SortableContext>
                </DndContext>
            ) : (
                "No data found"
            )}

            {/* ============== CARD MODAL ============== */}
            <CardModal
                isOpen={isOpenNote}
                setIsOpenNote={setIsOpenNote}
                data={selectedModalNote}
            />
        </div>
    );
};

export default Archived;
