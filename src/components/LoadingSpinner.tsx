//todo improve scalability
export const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 50 }}>
        <div className="spinner-border text-primary" role="status" aria-label="Loading">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
)