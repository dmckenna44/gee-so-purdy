
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import Underline from '@editorjs/underline';
import { SET_CURRENT_A, SET_CURRENT_Q } from "../constants/actionTypes";


const TextEditor = ({type, id}) => {

  const ejInstance = useRef();

  const { currentQuestion, currentAnswer } = useSelector(state => state.game);
  const dispatch = useDispatch();

  const INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
      {
        "type": "paragraph",
        "data": {
          "text": `${type === 'question' ? currentQuestion : currentAnswer}`
        }
      }
    ]
  }

  const initEditor = () => {
    const editor = new EditorJS({
      holder: id,
      onReady: () => {
        ejInstance.current = editor
      },
      autfocus: true,
      data: INITIAL_DATA,
      inlineToolbar: ['bold', 'underline', 'italic', 'link'],
      onChange: async () => {
        let content = await editor.saver.save();
        if (type === 'question') {
          dispatch({type: SET_CURRENT_Q, payload: content.blocks[0].data.text})
        } else dispatch({type: SET_CURRENT_A, payload: content.blocks[0].data.text})
      },
      tools: {
        underline: Underline
      }
    });
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    }
  }, [])

  return (
    <>
      <div id={id} className="text-editor"></div>
    </>
  
  )
}


export default TextEditor;