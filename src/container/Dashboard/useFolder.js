import { useEffect, useReducer, useState } from "react";
import { getFolderChildren, getFolderInfo } from "../../actions/folderAction";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILDREN: "set-children",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        children: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILDREN:
      return {
        ...state,
        children: payload.children,
      };
    default:
      return state;
  }
};

const useFolder = (folderId = null, folder = null) => {
  const [reFetchChild, setReFetchChild] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    children: [],
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    (async function () {
      try {
        const result = await getFolderInfo(folderId);
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: {
              name: result.name,
              id: result._id,
              path: result.path,
            },
          },
        });
      } catch (error) {}
    })();
  }, [folderId]);

  useEffect(() => {
    (async function () {
      try {
        const result = await getFolderChildren(folderId);
        return dispatch({
          type: ACTIONS.SET_CHILDREN,
          payload: {
            children: result,
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [folderId, reFetchChild]);

  return { ...state, setReFetchChild };
};

export default useFolder;
