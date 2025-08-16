import React, {Component} from "react";
import ProjectItem from './ProjectItem/projectItem';
const Routes = require('../../../../../public/js/fos_js_routes.json');
import Routing from '../../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

const projectItems =  (props) => {
    const [itemsDoc, setItemsDoc] = React.useState(props.items);

    function transformDate(dateString) {
        const isoFormatDate = /([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[+-](\d{4})|((\d{2})\:(\d{2}))/;
        if (dateString == null || !isoFormatDate.test(dateString)) {
            return null;
        }
        const date = dateString.replace(/\D/g, " ");
        const dtcomps = date.split(" ");
        dtcomps[1]--;
        return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
    }

    const deleteDocumentHandler = (idProj, idDoc, indexDoc) => {
        let url = Routing.generate('document-project-form-delete.' + document.documentElement.lang, {'documentProject': idDoc});
        fetch(url,  {method: 'DELETE'})
            .then(res => res.json())
            .then(
                (result) => {
                    const tempDoc = [...itemsDoc];
                    const tempDocChange = tempDoc.map((item)=> {
                        if(item.id === idProj){
                            item.documentProjects.splice(indexDoc,1);
                        }
                        return item;
                    });
                    setItemsDoc(tempDocChange);
                },
                (error) => {
                    alert(error);
                }
            )
    };

    return (
        <div>
        {itemsDoc ?
            itemsDoc.map((item) => {
                let myitem = {...item};
                myitem.startDate = transformDate(item.startDate);
               return  <ProjectItem key={myitem.id} {...myitem} deleteDocument={deleteDocumentHandler} projectEdit={() => props.projectEdit(myitem.id, false)}/>
            })
            : null
        }
        </div>
    );

};

export default projectItems;