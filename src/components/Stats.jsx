export const Stats = ({ statuses, total }) => {
    let status = "completed"
    return <div>
        <p>Stats</p>
        <ul>
            {
                Object.keys(statuses).map((status)=>{
                    return <li key={status}>{status}: {statuses[status]}/{total}</li>
                })
            }
        </ul>
    </div>
}
