import React, {useEffect, useRef, FC, useState} from "react";
import './index.css';
import * as htmlToImage from 'html-to-image';
import PropTypes from "prop-types";
import FormData from 'form-data';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import Image from '../Image';
import { Button } from '@strapi/design-system';
import axios from 'axios';
import { useFetchClient } from '@strapi/strapi/admin';

const Generator = () => {
  const { get } = useFetchClient();
  const { form, contentType, id  } = useContentManagerContext();
  const { values } = form;
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [recId, setRecId] = useState(null);
  let error = '';
  const apiId  = contentType.apiID;
  const imageSrc = values.image?.url || null;
  const title = values.title || null;

  if (!values.image) {
    error = 'Please upload Image';
  }
  if (!id) {
    error = 'Please create an record before.';
  }
  useEffect(() => {
    const handleRecord = async () => {
      try {
        const rec = await get(`/content-manager/collection-types/api::article.article/${id}?populate[category]=name`);
        setCategory(rec.data.data.category?.name);
        setRecId(rec.data.data.id);
      } catch (e) {
        console.log(e,'E');
      }
    };
    if (category.length == 0) {
      handleRecord();
    }
  }, [id])

  const allowedUID = ['article'];
  if(!allowedUID.includes(apiId)) {
    error = 'Allowed only for Article type';
  }
  

  const handleSave = async () => {
    try {
      const previewImageBlob = await htmlToImage.toBlob(document.getElementById("og-image"));
      const form = new FormData();
      const imageFile = new File([previewImageBlob], `${new Date().getTime()}_${id}.jpg`, { type: 'image/jpg' });
      form.append('files', imageFile);
      form.append('refId', recId);
      form.append('ref', `api::${apiId}.${apiId}`);
      form.append('field', 'ogImage');
      const response = await axios.post('/api/upload', form, {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_ADMIN_UPLOAD_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      const updateRecResponse = await axios.put(`/api/articles/${id}`, {
        data: {
          ogImage: response?.data[0]?.id
        }
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_ADMIN_UPLOAD_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        },
      });
    
      if (updateRecResponse.status == 200) {
        setMessage('Image successfully uploaded. Please refresh the page.');
      }
    } catch (e) {
      console.log(e,'Handle Save error.');
    }
  };
  const handleRefresh = async () => {
    const res = await get(`/og-image/get-address`);
    console.log(res,'res')
    console.log(process.env,'process.env');
  };

  return (
    <>
      <div className="generator_layout">
        {error.length == 0 && values.image && (
          <div className="generator_container">
            <div className="generator_buttons">
              <Button onClick={handleRefresh}>Refresh</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
            <div className="info_message">{message}</div>
            <Image imgUrl={imageSrc} title={title} type={category} />
          </div>
        )}
        {error.length > 0 && (
          <div className="info_message">{error}</div>
        )}
      </div>
    </>
  );

  };
  
  export default Generator;
  