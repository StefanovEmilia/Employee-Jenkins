const WorkLogs = ({ employee }) => {
    return (<>
        <ul>
            {employee.worklog.length > 0 ?
                employee.worklog.map((worklog, index) => <li key={index}>{worklog.workingLabel + ": " + worklog.workinghours + " hours"}</li>)
            : <li>There is no worklog yet!</li>}
    </ul>
    </>)
}

export default WorkLogs