import React,{useState,useEffect} from 'react';
import AWS from 'aws-sdk';
import Swal from 'sweetalert2';

const S3_BUCKET ='prashant-first-bucket';
const REGION ='ap-south-1';


AWS.config.update({
    accessKeyId: 'keyID',
    secretAccessKey: 'secretkey'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const Personate = () => {

  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState('');
  // ref
  const inputRef = React.useRef(null);

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
    console.log(e.dataTransfer.files[0])
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
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
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
      <div className='vids-section'>
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                        {
                vids()
            }
                        </div>
                        <div class="col">
                            Column
                        </div>
                        <div class="col">
                            Column
                        </div>
                    </div>
                </div>
            </div>
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
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
    </div>
  );
}

export default Personate