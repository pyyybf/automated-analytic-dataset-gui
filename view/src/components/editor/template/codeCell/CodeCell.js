import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";

export default function CodeCell(props) {
    return (
        <CodeEditor value={props.code}
                    language="python"
                    onChange={e => {
                        props.onChange(e.target.value);
                    }}
                    data-color-mode="light"
                    padding={15}
                    disabled={props.disabled}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        marginTop: '12px',
                    }}>
        </CodeEditor>
    );
}