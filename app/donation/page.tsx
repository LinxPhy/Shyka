'use client'

function Donation() {

    const Donate = async (amount: number) => {

        try {
            const response = await fetch('/api/donation', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ amount })
            })

            if (!response.ok) return

            const data = await response.json()
            const url = data.url

            window.location.href = url

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="Donation">

            <div className="title-section">
                <h1>Donation</h1>
            </div>

            <div className="intro">
                <div className="intro-text">
                    <p>
                        If you like this website and want to support it, you can donate to help keep it running.
                    </p>
                </div>
            </div>

            <div className="donations">

                <div className="donation-option" onClick={() => Donate(5)}>
                    £ 5
                </div>

                <div className="donation-option" onClick={() => Donate(10)}>
                    £ 10
                </div>

                <div className="donation-option" onClick={() => Donate(20)}>
                    £ 20
                </div>

                <div className="donation-option" onClick={() => Donate(50)}>
                    £ 50
                </div>

                <div className="donation-option" onClick={() => Donate(100)}>
                    £ 100
                </div>

                <div className="donation-option" onClick={() => Donate(500)}>
                    £ 500
                </div>

            </div>


        </div>
    )

}

export default Donation