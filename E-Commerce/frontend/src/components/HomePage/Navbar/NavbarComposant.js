import { React, useEffect } from 'react';

export default function NavbarComposant ({name, image}) {

    return (
        <div className="relative border-2 border-orange rounded-xl backdrop-filter backdrop-blur-md	flex p-2 m-4 w-96 flex-wrap">
            <img src={"data:image/png;base64," + image} alt="image_categorie"/>
            <h1 className="">
                {name}
            </h1>
        </div>
    )
}