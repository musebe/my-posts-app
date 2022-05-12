import React from 'react';

import Bio from './Bio';

export default {
  title: 'Components/Bio',
  component: Bio,
};

const Template = () => (
  <Bio
    headshot='https://res.cloudinary.com/hackit-africa/image/upload/c_thumb,w_200,g_face/v1580219806/me.jpg'
    name='Eugene Musebe'
    tagline='Community Builder!'
    role='Developer Advocate @ Cloudinary'
  />
);

export const Default = Template.bind({});
