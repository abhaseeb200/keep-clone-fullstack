import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
    createNoteReducer,
    deleteNoteReducer,
    getNotesReducer,
    updateNoteReducer,
} from "@/Features/note/noteSlice";
import API from "@/Config/api";

const useNotes = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const getNotes = async () => {
        try {
            const response = await API.get("/notes");
            dispatch(getNotesReducer(response.data.data));
        } catch (error) {
            // toast(error.message);
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // REMEMBER: PASS FROM_DATA IN THE BODY
    const createNote = async (body) => {
        try {
            const response = await API.post("/note", body);
            dispatch(createNoteReducer(response.data.data));
            toast(response.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // REMEMBER: PASS FROM_DATA IN THE BODY
    const updateNote = async (body) => {
        try {
            const response = await API.put(`/note/${body?.id}`, body);
            dispatch(updateNoteReducer(response.data.data));
            toast(response.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await API.delete(`/note/${id}`);
            dispatch(deleteNoteReducer(id));
            toast(response.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const searchNote = async (query) => {
        try {
            const response = await API.get(`/search?query=${query}`);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getNotes,
        updateNote,
        deleteNote,
        createNote,
        searchNote,
        isLoading,
    };
};

export default useNotes;
