import React from "react";
import DocumentButtonRemove from './Button/documentButtonRemove';
import DocumentButtonShow from './Button/documentButtonShow';

const projectDocuments= (props) => {

    let listBtnDoc = null;
    if(props.documentsProject.length > 0) {
        listBtnDoc = props.documentsProject.map((doc, index) => {
            return (
                <div style={{paddingRight: "15px"}} key={doc.id}>
                    <DocumentButtonShow {...doc}/>
                    <DocumentButtonRemove idDoc={doc.id} indexDoc={index}  idProj={props.idProj} deleteThisDoc={props.deleteOneDoc}/>
                </div>
            )
        });
    }
    return listBtnDoc;
};

export default projectDocuments;