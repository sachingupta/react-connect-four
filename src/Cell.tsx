import './Game.css';

export function Cell({ value, onClick }) {
    return (
        <div className="cell" onClick={onClick}>
            <div className={`piece ${value}`} />
        </div>
    );
}