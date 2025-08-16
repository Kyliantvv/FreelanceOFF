import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ResumeCard from "../Components/ResumeCard/ResumeCard";
import ProjectCard from "../Components/ProjectCard/ProjectCard";
import Aux from "../hoc/Auxiliary/Auxiliary";

class App extends Component {

    constructor(props) {
        super(props);
        const dataId = JSON.parse(document.getElementById('react').getAttribute('data-id'));
        document.getElementById('react').removeAttribute('data-id');
        this.state = {
            querySection: dataId ? dataId.querySection : null,
            query: dataId ? dataId.query : null,
            results: dataId ? JSON.parse(dataId.results) : null,
        }
    }

    transformDate(dateString) {
        const isoFormatDate = /([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[+-](\d{4})|((\d{2})\:(\d{2}))/;
        if (dateString == null || !isoFormatDate.test(dateString)) {
            return null;
        }
        const date = dateString.replace(/\D/g, " ");
        const dtcomps = date.split(" ");
        dtcomps[1]--;
        return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
    }

    render() {
        return (
            <Aux>
                {
                    this.state.results ?
                        this.state.results.map((data) => {
                            if (this.state.querySection === '1') {
                                return <ResumeCard
                                    key={data.id}
                                    idResume={data.id}
                                    avatar={data.avatar}
                                    civility={data.civility}
                                    firstName={data.firstName}
                                    lastName={data.lastName}
                                    email={data.email}
                                    phone={data.phone}
                                    mobilePhone={data.mobilePhone}
                                    zipCode={data.zipCode}
                                    address={data.address}
                                    country={data.country}
                                    birthday={this.transformDate(data.birthday)}
                                    jobSection={data.jobSection}
                                    description={data.description}
                                />;
                            }
                            else if (this.state.querySection === '2') {
                                return <ProjectCard
                                    key={data.id}
                                    idProject={data.id}
                                    avatar={data.avatar}
                                    projectName={data.projectName}
                                    projectType={data.projectType}
                                    startDate={this.transformDate(data.startDate)}
                                    location={data.location}
                                    duration={data.duration}
                                    description={data.description}
                                    comment={data.comment}
                                    email={data.email}
                                    enterprise={data.idEnterprise}
                                    status={data.status}
                                />;
                            }
                        })
                        :
                        null
                }
            </Aux>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react'));
