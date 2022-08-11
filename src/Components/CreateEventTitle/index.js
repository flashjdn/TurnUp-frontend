import "./index.css";

export default function createEventTitle() {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg">
                <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
                </filter>
            </svg>
            <h1 filter-content="Cr">Create Your Event</h1>
        </div>
    )
}