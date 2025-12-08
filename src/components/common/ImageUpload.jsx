import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ 
  value, 
  onChange, 
  error,
  label = 'Upload Image',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [preview, setPreview] = useState(value || null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    if (file.size > maxSize) {
      alert(`File size should be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange?.(file);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-slate-700/50"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center
            w-full h-48
            border-2 border-dashed rounded-xl
            cursor-pointer
            transition-all duration-300
            ${dragActive 
              ? 'border-violet-500 bg-violet-500/10' 
              : 'border-slate-700/50 hover:border-violet-500/50 bg-slate-800/30'
            }
            ${error ? 'border-red-500/50' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className={`
              p-3 rounded-xl mb-3 transition-colors duration-300
              ${dragActive ? 'bg-violet-500/20' : 'bg-slate-800/50'}
            `}>
              {dragActive ? (
                <ImageIcon className="w-8 h-8 text-violet-400" />
              ) : (
                <Upload className="w-8 h-8 text-slate-500" />
              )}
            </div>
            <p className="text-sm text-slate-400 mb-1">
              {dragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-xs text-slate-500">
              PNG, JPG up to {maxSize / 1024 / 1024}MB
            </p>
          </div>
          
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
