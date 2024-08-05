"use client"

import React , { useCallback, useEffect, useState } from "react";
import '../toolpage-styles.css'
import Image from "next/image";
import { Blocks, MagnifyingGlass } from "react-loader-spinner";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const OCR: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file , setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("/placeholder-image.jpg");
  const [loader , setLoader] = useState<Boolean>(false);
  const [description , setDescription] = useState<string>('');
  const [draggingImage , setDraggingImage] = useState<Boolean>(false)
  const [filterQuery , setFilterQuery] = useState<String>('');
  const [showLanguagePicker, setLanguagePicker] = useState<Boolean>(false)
  const [translating, setTranslating] = useState<Boolean>(false);
  const [usingUrl, setUsingUrl] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setDescription('')
    if (file) {
      setFileName(file.name);
      setFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput && description.length < 1) {
      fileInput.click();
    }
  };
  const handleDeleteClick = () => {
    console.log('deleted');
    
    setFileName(null);
    setDescription('')
    setImagePreview("/placeholder-image.jpg");
  };

  const scribeIt = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoader(true)
    setDescription('')

    if(usingUrl){
      try {
        const response = await fetch('/apis/post-des-image-url', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: imageUrl
          }),
        });
    
        if (!response.ok) {
          setLoader(false);
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
        setDescription(data.description["<MORE_DETAILED_CAPTION>"])
        setLoader(false)
        console.log("OCR result:", data.description["<MORE_DETAILED_CAPTION>"])
        // Handle the response data as needed
      } catch (error) {
        setLoader(false);
        console.error("There was an error with the fetch operation:", error);
      }
    } else{
      if (!file) {
        alert("Please upload an image first.");
        setLoader(false)
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch('/apis/post-description-image', {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          setLoader(false)
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        setLoader(false)
  
        const ocrText = data.description["<MORE_DETAILED_CAPTION>"];
        setDescription(ocrText);
        console.log("OCR result:", data);
        // Handle the response data as needed
      } catch (error) {
        setLoader(false)
        console.error("There was an error with the fetch operation:", error);
      }
    } 
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(description).then(() => {
      alert("Text copied to clipboard!");
    }).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    setDraggingImage(true)
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDescription('');
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
      setDraggingImage(false)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  type Language = {
    [key: string]: string;
  };

  const languages: Language[] = [
    { 'en': 'English' },
    { 'es': 'Spanish' },
    { 'zh': 'Chinese (Simplified)' },
    { 'fr': 'French' },
    { 'de': 'German' },
    { 'hi': 'Hindi' },
    { 'ja': 'Japanese' },
    { 'ko': 'Korean' },
    { 'pt': 'Portuguese' },
    { 'ru': 'Russian' },
    { 'ar': 'Arabic' },
    { 'ace': 'Achinese' },
    { 'acm': 'Mesopotamian Arabic' },
    { 'acq': 'Taizzi-Adeni Arabic' },
    { 'aeb': 'Tunisian Arabic' },
    { 'af': 'Afrikaans' },
    { 'ajp': 'South Levantine Arabic' },
    { 'ak': 'Akan' },
    { 'am': 'Amharic' },
    { 'apc': 'North Levantine Arabic' },
    { 'ars': 'Najdi Arabic' },
    { 'ary': 'Moroccan Arabic' },
    { 'arz': 'Egyptian Arabic' },
    { 'as': 'Assamese' },
    { 'ast': 'Asturian' },
    { 'awa': 'Awadhi' },
    { 'ay': 'Aymara' },
    { 'az': 'Azerbaijani (Latin)' },
    { 'azb': 'South Azerbaijani' },
    { 'ba': 'Bashkir' },
    { 'bm': 'Bambara' },
    { 'ban': 'Balinese' },
    { 'be': 'Belarusian' },
    { 'bem': 'Bemba' },
    { 'bn': 'Bengali' },
    { 'bho': 'Bhojpuri' },
    { 'bjn': 'Banjar (Latin)' },
    { 'bjn_Arab': 'Banjar (Arabic)' },
    { 'bo': 'Tibetan' },
    { 'bs': 'Bosnian' },
    { 'bug': 'Buginese' },
    { 'bg': 'Bulgarian' },
    { 'ca': 'Catalan' },
    { 'ceb': 'Cebuano' },
    { 'cs': 'Czech' },
    { 'cjk': 'Chokwe' },
    { 'cu': 'Chuvash' },
    { 'crh': 'Crimean Tatar' },
    { 'cy': 'Welsh' },
    { 'da': 'Danish' },
    { 'deu_Latn': 'German' },
    { 'dik': 'Dinka' },
    { 'dyu': 'Dyula' },
    { 'dz': 'Dzongkha' },
    { 'el': 'Greek' },
    { 'eo': 'Esperanto' },
    { 'et': 'Estonian' },
    { 'eu': 'Basque' },
    { 'ee': 'Ewe' },
    { 'fo': 'Faroese' },
    { 'fa': 'Persian' },
    { 'fj': 'Fijian' },
    { 'fi': 'Finnish' },
    { 'fon': 'Fon' },
    { 'fur': 'Friulian' },
    { 'fuv': 'Nigerian Fulfulde' },
    { 'gd': 'Scottish Gaelic' },
    { 'ga': 'Irish' },
    { 'gl': 'Galician' },
    { 'gn': 'Guarani' },
    { 'gu': 'Gujarati' },
    { 'ht': 'Haitian Creole' },
    { 'ha': 'Hausa' },
    { 'he': 'Hebrew' },
    { 'hne': 'Chhattisgarhi' },
    { 'hr': 'Croatian' },
    { 'hu': 'Hungarian' },
    { 'hy': 'Armenian' },
    { 'ig': 'Igbo' },
    { 'ilo': 'Ilocano' },
    { 'id': 'Indonesian' },
    { 'is': 'Icelandic' },
    { 'it': 'Italian' },
    { 'jv': 'Javanese' },
    { 'kab': 'Kabyle' },
    { 'kac': 'Jingpho' },
    { 'kam': 'Kamba' },
    { 'kn': 'Kannada' },
    { 'ks': 'Kashmiri (Arabic)' },
    { 'kas_Deva': 'Kashmiri (Devanagari)' },
    { 'ka': 'Georgian' },
    { 'knc': 'Kanuri (Latin)' },
    { 'knc_Arab': 'Kanuri (Arabic)' },
    { 'kk': 'Kazakh' },
    { 'kbp': 'Kabiye' },
    { 'kea': 'Kabuverdianu' },
    { 'km': 'Khmer' },
    { 'ki': 'Kikuyu' },
    { 'rw': 'Kinyarwanda' },
    { 'ky': 'Kyrgyz' },
    { 'kmb': 'Kimbundu' },
    { 'kg': 'Kongo' },
    { 'ku': 'Northern Kurdish' },
    { 'lo': 'Lao' },
    { 'lv': 'Latvian' },
    { 'lij': 'Ligurian' },
    { 'lim': 'Limburgish' },
    { 'ln': 'Lingala' },
    { 'lt': 'Lithuanian' },
    { 'lmo': 'Lombard' },
    { 'ltg': 'Latgalian' },
    { 'lb': 'Luxembourgish' },
    { 'lua': 'Luba-Kasai' },
    { 'lg': 'Ganda' },
    { 'luo': 'Luo' },
    { 'lus': 'Mizo' },
    { 'mag': 'Magahi' },
    { 'mai': 'Maithili' },
    { 'ml': 'Malayalam' },
    { 'mr': 'Marathi' },
    { 'min': 'Minangkabau' },
    { 'mk': 'Macedonian' },
    { 'plt': 'Palauan' },
    { 'mt': 'Maltese' },
    { 'mni': 'Manipuri' },
    { 'mos': 'Mossi' },
    { 'mi': 'Maori' },
    { 'zsm': 'Malay (Standard)' },
    { 'my': 'Burmese' },
    { 'nl': 'Dutch' },
    { 'nno': 'Norwegian Nynorsk' },
    { 'nob': 'Norwegian Bokmål' },
    { 'ne': 'Nepali' },
    { 'nso': 'Northern Sotho' },
    { 'nus': 'Nuer' },
    { 'nya': 'Nyanja' },
    { 'oc': 'Occitan' },
    { 'om': 'Oromo' },
    { 'or': 'Oriya' },
    { 'pag': 'Pangasinan' },
    { 'pa': 'Punjabi (Gurmukhi)' },
    { 'pap': 'Papiamento' },
    { 'pl': 'Polish' },
    { 'pt': 'Portuguese' },
    { 'prs': 'Dari' },
    { 'pbt': 'Pashto (Tajik)' },
    { 'qu': 'Quechua' },
    { 'ro': 'Romanian' },
    { 'run': 'Rundi' },
    { 'sag': 'Sango' },
    { 'san': 'Sanskrit' },
    { 'sat': 'Santali' },
    { 'scn': 'Sicilian' },
    { 'shn': 'Shan' },
    { 'si': 'Sinhala' },
    { 'sk': 'Slovak' },
    { 'sl': 'Slovenian' },
    { 'sm': 'Samoan' },
    { 'sn': 'Shona' },
    { 'sd': 'Sindhi' },
    { 'so': 'Somali' },
    { 'st': 'Southern Sotho' },
    { 'als': 'Albanian (Gheg)' },
    { 'srd': 'Sardinian' },
    { 'sr': 'Serbian' },
    { 'ss': 'Swati' },
    { 'su': 'Sundanese' },
    { 'sv': 'Swedish' },
    { 'sw': 'Swahili' },
    { 'szl': 'Silesian' },
    { 'ta': 'Tamil' },
    { 'tt': 'Tatar' },
    { 'te': 'Telugu' },
    { 'tg': 'Tajik' },
    { 'tl': 'Tagalog' },
    { 'th': 'Thai' },
    { 'ti': 'Tigrinya' },
    { 'taq': 'Tamajaq' },
    { 'tpi': 'Tok Pisin' },
    { 'ts': 'Tswana' },
    { 'tn': 'Tsonga' },
    { 'tk': 'Turkmen' },
    { 'tum': 'Tumbuka' },
    { 'tvl': 'Tuvaluan' },
    { 'tr': 'Turkish' },
    { 'uk': 'Ukrainian' },
    { 'ur': 'Urdu' },
    { 'vi': 'Vietnamese' },
    { 'war': 'Waray' },
    { 'wo': 'Wolof' },
    { 'xh': 'Xhosa' },
    { 'yue': 'Yue Chinese' },
    { 'yo': 'Yoruba' },
    { 'zu': 'Zulu' }
];

const filteredLanguages = languages.filter(language => {
  const langName = Object.values(language)[0].toLowerCase();
  const langCode = Object.keys(language)[0].toLowerCase();
  return langName.includes(filterQuery.toLowerCase()) || langCode.includes(filterQuery.toLowerCase());
});

const handleFilterChange = (lang: React.SetStateAction<String>)=>{
    setFilterQuery(lang)
}

const hitTranslateApi = async (event: any, target: string) => {
  event.preventDefault();
  setLoader(true);
  setTranslating(true);
  setLanguagePicker(false)
  
  if (description?.length < 1) {
    alert("There's no text to translate");
    setLoader(false);
    setTranslating(false)
    return;
  }

  try {
    const response = await fetch('/apis/translate-text', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: description,
        targetLang: target,
      }),
    });

    if (!response.ok) {
      setLoader(false);
      setTranslating(false)
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setDescription(data.translatedText);
    setLanguagePicker(false)
    setLoader(false);
    setTranslating(false);

    console.log("OCR result:", data.translatedText);
    // Handle the response data as needed
  } catch (error) {
    setLoader(false);
    setTranslating(false);
    console.error("There was an error with the fetch operation:", error);
  }
}

  
  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="ocr-page relative"
      >
        <h1 className=" text-center mt-6 text-primary_color text-2xl font-semibold">AI Image Description</h1>
        <p className=" mx-auto text-center">Identify Objects and Things in Images</p>
        <div
          style={{ display: draggingImage ? "block" : "none" }}
          className="image-drop-overlay absolute top-0 left-0 w-full h-full z-50 bg-[rgba(255,254,254,0.75)] backdrop-blur-[10px]"
        >
          <div className="heading font-koulen text-[28px] mt-[13%] text-center text-primary_color">
            Drop It Anywhere!
          </div>
          <div className="text flex gap-1 justify-center mt-[48%]">
            <FaPlus size={25} className="icon text-primary_color" />{" "}
            <div className="caption text-[#000000]">Drop Image</div>
          </div>
        </div>
        <form className="upload-container">
        <div className="flex items-center mt-6 ">
            <input
              type="radio"
              id="upload-file"
              name="input-type"
              checked={!usingUrl}
              onChange={() => {
                setUsingUrl(false)
                setImageUrl('')
              }}
            />
            <label htmlFor="upload-file" className="ml-2">Upload Image</label>
            <input
              type="radio"
              id="url-input"
              name="input-type"
              checked={usingUrl}
              onChange={() => {
                setUsingUrl(true)
                setFile(null)
              }}
              className="ml-4"
            />
            <label htmlFor="url-input" className="ml-2">URL Input</label>
          </div>
          {
            usingUrl ? 
            <div className="url-input-container relative !p-0 upload-input">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="url-input w-full h-full px-4 py-3 !outline-none rounded-lg"
              />
            </div> :
                  <div onClick={()=>{
                    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
                    if (fileInput && description?.length < 1) {
                      fileInput.click();
                    }
                  }} className="upload-input mx-auto">
                    <span className="file-name">{fileName || "Choose a File"}</span>
                    <input
                      type="file"
                      id="file-upload"
                      className="file-input"
                      onChange={handleFileChange}
                    />
                    <label onClick={(event)=>event.stopPropagation()} htmlFor="file-upload" className="upload-button font-koulen">
                      Upload
                    </label>
                  </div>
          }
          <button onClick={scribeIt} className="scribe-btn" type="submit">
            Scribe It!
          </button>
        </form>
        <div className="tool-section">
        <div
          onClick={handleImageClick}
          style={{backgroundImage: 'url("/placeholder-image.jpg")' , backgroundSize: 'cover'}}
          className="picture-wrapper w-[80%] h-[50vh] relative mx-auto mt-4 rounded-[10px] overflow-hidden border-2 border-[rgba(0,0,0,0.40)]"
        >
          <div
            style={{ display: showLanguagePicker ? "flex" : "none" }}
            onClick={(e) => e.stopPropagation()}
            className="language-picker overflow-scroll z-50 flex flex-col absolute top-0 left-0 w-full h-full bg-[#F9F9F9]"
          >
            <div className="input-wrapper sticky top-0 mt-4 mb-1 flex gap-1 justify-center">
              <input
                type="text"
                onChange={(event) => handleFilterChange(event.target.value)}
                className=" placeholder:font-[inherit] outline-primary_color py-1 text-center text-[18px] border border-[rgba(0,0,0,0.47)] w-[75%] rounded-[6px]"
                placeholder="Find Language"
              />
              <div onClick={() => setLanguagePicker(false)} className="close">
                <IoClose className=" text-accent_color absolute top-1 right-1 text-[28px]" />
              </div>
            </div>
            {filteredLanguages.map((language, index) => (
              <button
                key={index}
                onClick={(event) => {
                  hitTranslateApi(event, Object.keys(language)[0]);
                }}
                className="text-[19px] font-medium border-b py-[8px] border-b-[rgba(0,0,0,0.3)]"
              >
                {Object.values(language)[0]}
              </button>
            ))}
          </div>
          <div
            style={{ display: loader ? "flex" : "none" }}
            className="loader text-xl text-white font-bold backdrop-blur-[2px] relative z-50 w-full h-full flex-col items-center justify-center"
          > {
            translating ? <> <Blocks
            height="80"
            width="80"
            color="#00CCFF"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
            /> Translating</> :
          <>
          <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#00CCFF"
          /> Scanning...
          </>
          }
          </div>
          <Image
            src={imageUrl.length < 1 ? imagePreview : imageUrl}
            style={{opacity: 1}}
            className=" object-cover object-center active:opacity-60"
            fill
            unoptimized
            alt=""
          />
          <div
            style={{ display: description?.length > 0 ? "flex" : "none" }}
            onClick={handleCopyToClipboard}
            className="extracted-text flex items-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] backdrop-blur-[2px]"
          >
            <p className="text-white px-2">{description}</p>
          </div>
        </div>

        <div className="options flex items-center justify-end px-8 py-[5px] mt-3 mb-4 bg-[rgba(217,217,217,0.85)]">
          <button
            onClick={() => {
              setLanguagePicker((prev) => !prev);
            }}
            className="translate-btn active:opacity-60 flex items-center gap-1 mr-4 text-[#FF5353] active:text-[rgba(255,83,83,0.4)] text-[28px]"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_129_9)">
                <path
                  d="M8.52188 12.5888L7.70625 15H5.625L9.11625 5.625H11.5237L15 15H12.8119L11.9962 12.5888H8.52188ZM11.5856 11.2088L10.3125 7.4175H10.2206L8.9475 11.2088H11.5856Z"
                  fill="#00CCFF"
                />
                <path
                  d="M0 3.75C0 2.75544 0.395088 1.80161 1.09835 1.09835C1.80161 0.395088 2.75544 0 3.75 0L16.875 0C17.8696 0 18.8234 0.395088 19.5266 1.09835C20.2299 1.80161 20.625 2.75544 20.625 3.75V9.375H26.25C27.2446 9.375 28.1984 9.77009 28.9016 10.4733C29.6049 11.1766 30 12.1304 30 13.125V26.25C30 27.2446 29.6049 28.1984 28.9016 28.9016C28.1984 29.6049 27.2446 30 26.25 30H13.125C12.1304 30 11.1766 29.6049 10.4733 28.9016C9.77009 28.1984 9.375 27.2446 9.375 26.25V20.625H3.75C2.75544 20.625 1.80161 20.2299 1.09835 19.5266C0.395088 18.8234 0 17.8696 0 16.875V3.75ZM3.75 1.875C3.25272 1.875 2.77581 2.07254 2.42417 2.42417C2.07254 2.77581 1.875 3.25272 1.875 3.75V16.875C1.875 17.3723 2.07254 17.8492 2.42417 18.2008C2.77581 18.5525 3.25272 18.75 3.75 18.75H16.875C17.3723 18.75 17.8492 18.5525 18.2008 18.2008C18.5525 17.8492 18.75 17.3723 18.75 16.875V3.75C18.75 3.25272 18.5525 2.77581 18.2008 2.42417C17.8492 2.07254 17.3723 1.875 16.875 1.875H3.75ZM17.1337 20.6156C17.495 21.1794 17.8887 21.7081 18.315 22.2019C16.9125 23.28 15.1781 24.0788 13.125 24.6244C13.4588 25.0313 13.9706 25.815 14.1656 26.25C16.275 25.5769 18.0656 24.6675 19.5769 23.4487C21.0337 24.6956 22.8375 25.6331 25.0706 26.2087C25.32 25.7325 25.8469 24.9469 26.25 24.54C24.1406 24.0656 22.3931 23.2387 20.9625 22.1325C22.2394 20.7319 23.2537 19.0369 24.0019 16.9631H26.25V15H20.625V16.9631H22.0594C21.4631 18.5456 20.6719 19.8619 19.6744 20.9569C19.3987 20.6635 19.1389 20.3556 18.8963 20.0344C18.3667 20.3727 17.7607 20.5726 17.1337 20.6156Z"
                  fill="#00CCFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_129_9">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className=" text-black text-base mt-1 select-none">
              Translate
            </span>
          </button>
          <button
            onClick={handleDeleteClick}
            id="delete-img"
            className="delete-btn ml-4 mr-4 text-[#FF5353] active:text-[rgba(255,83,83,0.4)] text-[28px]"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.58585 28.4202C2.58585 29.8433 3.74252 31.006 5.17171 31.006H25.8404C27.2635 31.006 28.4262 29.8493 28.4262 28.4202V11.6273H2.58585V28.4202ZM21.9646 15.503H24.5505V27.1303H21.9646V15.503ZM14.2131 15.503H16.799V27.1303H14.2131V15.503ZM6.4616 15.503H9.04746V27.1303H6.4616V15.503ZM29.7161 5.16565H21.9646V2.58585C21.9646 1.15667 20.8019 0 19.3788 0H11.6273C10.2041 0 9.0414 1.15667 9.0414 2.58585V5.17171H1.2899C0.575307 5.16565 0 5.74701 0 6.4616V7.7515C0 8.46609 0.575307 9.0414 1.2899 9.0414H29.7101C30.4246 9.0414 31 8.46609 31 7.7515V6.4616C31.006 5.74701 30.4307 5.16565 29.7161 5.16565ZM19.3788 5.16565H11.6273V2.58585H19.3788V5.16565Z"
                fill="currentColor"
              />
            </svg>
            <span className=" hidden text-black text-base mt-1 select-none">
              Remove
            </span>
          </button>
          <button
            onClick={handleCopyToClipboard}
            className="copy-btn ml-4 text-[#00CCFF] active:text-[rgba(0,204,255,0.4)] text-[30px]"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.9131 9.08189H24.8869V6.1961C24.8884 5.3691 24.6455 4.56009 24.1887 3.87071C23.7319 3.18132 23.0815 2.6423 22.3193 2.32134C21.8134 2.10971 21.2705 2.00049 20.722 2H8.16493C7.61594 2.00204 7.07272 2.1122 6.5663 2.32418C6.05988 2.53616 5.60018 2.84582 5.21343 3.23546C4.82668 3.6251 4.52047 4.08711 4.31227 4.5951C4.10408 5.10308 3.99798 5.6471 4.00003 6.1961V21.9354C3.99798 22.4843 4.10408 23.0284 4.31227 23.5364C4.52047 24.0443 4.82668 24.5063 5.21343 24.896C5.60018 25.2856 6.05988 25.5953 6.5663 25.8073C7.07272 26.0192 7.61594 26.1294 8.16493 26.1314H11.1911V29.0172C11.1911 30.1233 11.6294 31.1842 12.41 31.9678C13.1907 32.7513 14.25 33.1936 15.356 33.1977H27.8351C28.9411 33.1936 30.0005 32.7513 30.7811 31.9678C31.5617 31.1842 32 30.1233 32 29.0172V13.278C32.0004 12.1838 31.5733 11.1327 30.8098 10.3488C30.0464 9.56499 29.0069 9.11036 27.9131 9.08189ZM11.1911 13.278V23.7916H8.16493C7.9232 23.7896 7.68425 23.7399 7.46171 23.6456C7.23917 23.5512 7.0374 23.4139 6.86793 23.2415C6.69845 23.0691 6.56459 22.8651 6.47398 22.6409C6.38338 22.4168 6.3378 22.1771 6.33986 21.9354V6.1961C6.3378 5.95437 6.38338 5.71461 6.47398 5.49051C6.56459 5.2664 6.69845 5.06233 6.86793 4.88996C7.0374 4.71759 7.23917 4.58029 7.46171 4.48589C7.68425 4.3915 7.9232 4.34187 8.16493 4.33983H20.722C20.9637 4.34187 21.2027 4.3915 21.4252 4.48589C21.6478 4.58029 21.8495 4.71759 22.019 4.88996C22.1885 5.06233 22.3224 5.2664 22.413 5.49051C22.5036 5.71461 22.5491 5.95437 22.5471 6.1961V9.08189H15.356C14.2485 9.09012 13.1892 9.53584 12.4091 10.3219C11.6289 11.1079 11.1911 12.1705 11.1911 13.278Z"
                fill="currentColor"
              />
            </svg>
            <span className=" hidden text-black text-base mt-1 select-none">
              Copy Text
            </span>
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default OCR;
