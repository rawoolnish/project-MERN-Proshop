import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Proshop',
    description: 'we sell products for the cheap price',
    keywords: 'electronics, buy electronics,best electronics produts,cheap electronics prodcuts'
}
export default Meta