import React,{useState,useEffect} from 'react';
import AWS from 'aws-sdk';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

const S3_BUCKET ='prashant-first-bucket';
const REGION ='ap-south-1';


AWS.config.update({
    accessKeyId: 'YourKeyID',
    secretAccessKey: 'ScretKey'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const Personate = () => {

  const notify = () => toast("Uploaded !");

  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState('');
    const [listFiles, setListFiles] = useState([]);
  // ref
  const inputRef = React.useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    var link = localStorage.getItem('videolink');
    setUrl(link)
  },[])
  
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    console.log(e.dataTransfer.files.length)
    const fileLength = e.dataTransfer.files.length
    if(fileLength>1){
      setSelectedFile(e.dataTransfer.files);
      console.log(e.dataTransfer.files)
      e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    var result = Object.keys(e.dataTransfer.files).map((key) => {
        const params = {
        ACL: 'public-read',
        Body: e.dataTransfer.files[key],
        Bucket: S3_BUCKET,
        Key: e.dataTransfer.files[key].name
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
            const region = 'ap-south-1';
        const Bucket = 'prashant-first-bucket'
        const regionString = region.includes('ap-south-1') ? '' : ('-' + region)
        setUrl(`https://${Bucket}.s3.${region}.amazonaws.com/${params.key}`)
        localStorage.setItem('videolink',`https://${Bucket}.s3.${region}.amazonaws.com/${params.Key}`)
        vids();
        // Swal.fire("Upload Success")
        notify();
        // window.location.href='/'
        })
    console.log(params)
    console.log("check")
    console.log(result)
    });
   
   
    // if (e.dataTransfer.files) {
    //   // handleFiles(e.dataTransfer.files);
    //   const params = {
    //     ACL: 'public-read',
    //     Body: e.dataTransfer.files,
    //     Bucket: S3_BUCKET,
    //     Key: e.dataTransfer.files[0].name
    // };

    // myBucket.putObject(params)
    //     .on('httpUploadProgress', (evt) => {
    //         setProgress(Math.round((evt.loaded / evt.total) * 100))
    //     })
    //     .send((err) => {
    //         if (err) console.log(err)
    //         const region = 'ap-south-1';
    //     const Bucket = 'prashant-first-bucket'
    //     const regionString = region.includes('ap-south-1') ? '' : ('-' + region)
    //     setUrl(`https://${Bucket}.s3.${region}.amazonaws.com/${name}`)
    //     localStorage.setItem('videolink',`https://${Bucket}.s3.${region}.amazonaws.com/${name}`)
    //     vids();
    //     Swal.fire("Upload Success")
    //     window.location.href='/'
    //     })
    // }
    
    
    }else{
      setSelectedFile(e.dataTransfer.files[0]);
      const name = e.dataTransfer.files[0].name
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      const params = {
        ACL: 'public-read',
        Body: e.dataTransfer.files[0],
        Bucket: S3_BUCKET,
        Key: e.dataTransfer.files[0].name
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
            const region = 'ap-south-1';
        const Bucket = 'prashant-first-bucket'
        const regionString = region.includes('ap-south-1') ? '' : ('-' + region)
        setUrl(`https://${Bucket}.s3.${region}.amazonaws.com/${name}`)
        localStorage.setItem('videolink',`https://${Bucket}.s3.${region}.amazonaws.com/${name}`)
        vids();
        Swal.fire("Upload Success")
        window.location.href='/'
        })
    }
    }
    console.log(e.dataTransfer.files)
    
    
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files)
      setSelectedFile(e.target.files)
      // handleFiles(e.target.files);
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = () => {
    if(selectedFile=='' || selectedFile==null){
      Swal.fire("Please select a file !")
    }else{
      showModal()
    console.log(selectedFile[0])
    inputRef.current.click();
    setSelectedFile(selectedFile[0]);
      const name = selectedFile[0].name
    setDragActive(false);

      const params = {
        ACL: 'public-read',
        Body: selectedFile[0],
        Bucket: S3_BUCKET,
        Key: selectedFile[0].name
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
            const region = 'ap-south-1';
        const Bucket = 'prashant-first-bucket'
        const regionString = region.includes('ap-south-1') ? '' : ('-' + region)
        setUrl(`https://${Bucket}.s3.${region}.amazonaws.com/${name}`)
        localStorage.setItem('videolink',`https://${Bucket}.s3.${region}.amazonaws.com/${name}`)
        vids();
        Swal.fire("Upload Success")
        window.location.href='/'
        })
    }
  };

  function vids(){
    if(localStorage.getItem('videolink') != ''){
      const urlink = localStorage.getItem('videolink')
      return <video controls style={{ height: 200, width: 200 }}>
      <source src={urlink} type="video/mp4" />
  </video>
    }else{
      return (
      
        progress === 100 ?
                      <video controls style={{ height: 200, width: 200 }}>
                          <source src={url} type="video/mp4" />
                      </video>
                      : null
      )
    }
    
  }
  
  return (
    <div>
      <ToastContainer />
      <div className='vids-section'>
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                        {
                vids()
            }
                        </div>
                    </div>
                </div>
            </div>
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple onChange={handleChange} accept="video/mp4"/>
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
    <div className='progress-bar'>File Upload Progress is {progress}%</div>
    <p>{url}</p>
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h3>Uploading - {progress}%</h3>
      </Modal>
    </div>
  );
}

export default Personate