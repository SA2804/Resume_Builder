import Drawer from '@mui/material/Drawer'

function DrawerComponent({ isOpen, onClose, content }) {
    const handleImageClick = (imageURL) => {
        document.body.style.backgroundImage = `url(${imageURL})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
    }
    return (
        <Drawer
            anchor="bottom"
            open={isOpen}
            onClose={onClose}
            PaperProps={{ style: { height: '400px' } }} // Adjust height as needed
        >
            <div style={{ padding: '20px' }}>
                {content.map((imageURL, index) => {
                    return (
                        <img
                            key={index}
                            src={imageURL}
                            height={'150px'}
                            width={'150px'}
                            className=" me-3"
                            alt={`pic-${index}`}
                            onClick={() => handleImageClick(imageURL)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleImageClick(imageURL)
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex={0} // Make the image focusable
                        />
                    )
                })}
                <button
                    onClick={() => {
                        document.body.style.background =
                            'radial-gradient(circle,rgba(255, 238, 219, 1) 0%,rgba(255, 153, 102, 1) 49%,rgba(255, 94, 98, 1) 100%)'
                    }}
                >
                    Normal Background
                </button>
            </div>
        </Drawer>
    )
}

export default DrawerComponent
