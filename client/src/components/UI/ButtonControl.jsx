import Button from '@mui/material/Button'

function ButtonControl({ onClick, isOpen, color }) {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            color={color || 'primary'}
        >
            {isOpen ? 'Close Drawer' : 'Background'}
        </Button>
    )
}

export default ButtonControl
