import express from 'express';
import langdetect from 'langdetect';
import { pipeline } from '@xenova/transformers';

const router = express.Router();

const langMap = {
    'ace': 'ace_Latn',  // Achinese
    'ace_Arab': 'ace_Arab',  // Achinese in Arabic script
    'acm': 'acm_Arab',  // Mesopotamian Arabic
    'acq': 'acq_Arab',  // Taizzi-Adeni Arabic
    'aeb': 'aeb_Arab',  // Tunisian Arabic
    'af': 'afr_Latn',  // Afrikaans
    'ajp': 'ajp_Arab',  // South Levantine Arabic
    'ak': 'aka_Latn',  // Akan
    'am': 'amh_Ethi',  // Amharic
    'apc': 'apc_Arab',  // North Levantine Arabic
    'ar': 'arb_Arab',  // Arabic
    'ars': 'ars_Arab',  // Najdi Arabic
    'ary': 'ary_Arab',  // Moroccan Arabic
    'arz': 'arz_Arab',  // Egyptian Arabic
    'as': 'asm_Beng',  // Assamese
    'ast': 'ast_Latn',  // Asturian
    'awa': 'awa_Deva',  // Awadhi
    'ay': 'ayr_Latn',  // Aymara
    'az': 'azj_Latn',  // Azerbaijani (Latin)
    'azb': 'azb_Arab',  // South Azerbaijani
    'ba': 'bak_Cyrl',  // Bashkir
    'bm': 'bam_Latn',  // Bambara
    'ban': 'ban_Latn',  // Balinese
    'be': 'bel_Cyrl',  // Belarusian
    'bem': 'bem_Latn',  // Bemba
    'bn': 'ben_Beng',  // Bengali
    'bho': 'bho_Deva',  // Bhojpuri
    'bjn': 'bjn_Latn',  // Banjar (Latin)
    'bjn_Arab': 'bjn_Arab',  // Banjar (Arabic)
    'bo': 'bod_Tibt',  // Tibetan
    'bs': 'bos_Latn',  // Bosnian
    'bug': 'bug_Latn',  // Buginese
    'bg': 'bul_Cyrl',  // Bulgarian
    'ca': 'cat_Latn',  // Catalan
    'ceb': 'ceb_Latn',  // Cebuano
    'cs': 'ces_Latn',  // Czech
    'cjk': 'cjk_Latn',  // Chokwe
    'cu': 'ckb_Arab',  // Chuvash
    'crh': 'crh_Latn',  // Crimean Tatar
    'cy': 'cym_Latn',  // Welsh
    'da': 'dan_Latn',  // Danish
    'de': 'deu_Latn',  // German
    'dik': 'dik_Latn',  // Dinka
    'dyu': 'dyu_Latn',  // Dyula
    'dz': 'dzo_Tibt',  // Dzongkha
    'el': 'ell_Grek',  // Greek
    'en': 'eng_Latn',  // English
    'eo': 'epo_Latn',  // Esperanto
    'et': 'est_Latn',  // Estonian
    'eu': 'eus_Latn',  // Basque
    'ee': 'ewe_Latn',  // Ewe
    'fo': 'fao_Latn',  // Faroese
    'fa': 'pes_Arab',  // Persian
    'fj': 'fij_Latn',  // Fijian
    'fi': 'fin_Latn',  // Finnish
    'fon': 'fon_Latn',  // Fon
    'fr': 'fra_Latn',  // French
    'fur': 'fur_Latn',  // Friulian
    'fuv': 'fuv_Latn',  // Nigerian Fulfulde
    'gd': 'gla_Latn',  // Scottish Gaelic
    'ga': 'gle_Latn',  // Irish
    'gl': 'glg_Latn',  // Galician
    'gn': 'grn_Latn',  // Guarani
    'gu': 'guj_Gujr',  // Gujarati
    'ht': 'hat_Latn',  // Haitian Creole
    'ha': 'hau_Latn',  // Hausa
    'he': 'heb_Hebr',  // Hebrew
    'hi': 'hin_Deva',  // Hindi
    'hne': 'hne_Deva',  // Chhattisgarhi
    'hr': 'hrv_Latn',  // Croatian
    'hu': 'hun_Latn',  // Hungarian
    'hy': 'hye_Armn',  // Armenian
    'ig': 'ibo_Latn',  // Igbo
    'ilo': 'ilo_Latn',  // Ilocano
    'id': 'ind_Latn',  // Indonesian
    'is': 'isl_Latn',  // Icelandic
    'it': 'ita_Latn',  // Italian
    'jv': 'jav_Latn',  // Javanese
    'ja': 'jpn_Jpan',  // Japanese
    'kab': 'kab_Latn',  // Kabyle
    'kac': 'kac_Latn',  // Jingpho
    'kam': 'kam_Latn',  // Kamba
    'kn': 'kan_Knda',  // Kannada
    'ks': 'kas_Arab',  // Kashmiri (Arabic)
    'kas_Deva': 'kas_Deva',  // Kashmiri (Devanagari)
    'ka': 'kat_Geor',  // Georgian
    'knc': 'knc_Latn',  // Kanuri (Latin)
    'knc_Arab': 'knc_Arab',  // Kanuri (Arabic)
    'kk': 'kaz_Cyrl',  // Kazakh
    'kbp': 'kbp_Latn',  // Kabiye
    'kea': 'kea_Latn',  // Kabuverdianu
    'km': 'khm_Khmr',  // Khmer
    'ki': 'kik_Latn',  // Kikuyu
    'rw': 'kin_Latn',  // Kinyarwanda
    'ky': 'kir_Cyrl',  // Kyrgyz
    'kmb': 'kmb_Latn',  // Kimbundu
    'kg': 'kon_Latn',  // Kongo
    'ko': 'kor_Hang',  // Korean
    'ku': 'kmr_Latn',  // Northern Kurdish
    'lo': 'lao_Laoo',  // Lao
    'lv': 'lvs_Latn',  // Latvian
    'lij': 'lij_Latn',  // Ligurian
    'lim': 'lim_Latn',  // Limburgish
    'ln': 'lin_Latn',  // Lingala
    'lt': 'lit_Latn',  // Lithuanian
    'lmo': 'lmo_Latn',  // Lombard
    'ltg': 'ltg_Latn',  // Latgalian
    'lb': 'ltz_Latn',  // Luxembourgish
    'lua': 'lua_Latn',  // Luba-Kasai
    'lg': 'lug_Latn',  // Ganda
    'luo': 'luo_Latn',  // Luo
    'lus': 'lus_Latn',  // Mizo
    'mag': 'mag_Deva',  // Magahi
    'mai': 'mai_Deva',  // Maithili
    'ml': 'mal_Mlym',  // Malayalam
    'mr': 'mar_Deva',  // Marathi
    'min': 'min_Latn',  // Minangkabau
    'mk': 'mkd_Cyrl',  // Macedonian
    'plt': 'plt_Latn',  // Palauan
    'mt': 'mlt_Latn',  // Maltese
    'mni': 'mni_Beng',  // Manipuri
    'mos': 'mos_Latn',  // Mossi
    'mi': 'mri_Latn',  // Maori
    'zsm': 'zsm_Latn',  // Malay (Standard)
    'my': 'mya_Mymr',  // Burmese
    'nl': 'nld_Latn',  // Dutch
    'nno': 'nno_Latn',  // Norwegian Nynorsk
    'nob': 'nob_Latn',  // Norwegian Bokmål
    'ne': 'npi_Deva',  // Nepali
    'nso': 'nso_Latn',  // Northern Sotho
    'nus': 'nus_Latn',  // Nuer
    'nya': 'nya_Latn',  // Nyanja
    'oc': 'oci_Latn',  // Occitan
    'om': 'gaz_Latn',  // Oromo
    'or': 'ory_Orya',  // Oriya
    'pag': 'pag_Latn',  // Pangasinan
    'pa': 'pan_Guru',  // Punjabi (Gurmukhi)
    'pap': 'pap_Latn',  // Papiamento
    'pl': 'pol_Latn',  // Polish
    'pt': 'por_Latn',  // Portuguese
    'prs': 'prs_Arab',  // Dari
    'pbt': 'pbt_Arab',  // Pashto (Tajik)
    'qu': 'quy_Latn',  // Quechua
    'ro': 'ron_Latn',  // Romanian
    'run': 'run_Latn',  // Rundi
    'ru': 'rus_Cyrl',  // Russian
    'sag': 'sag_Latn',  // Sango
    'san': 'san_Deva',  // Sanskrit
    'sat': 'sat_Beng',  // Santali
    'scn': 'scn_Latn',  // Sicilian
    'shn': 'shn_Mymr',  // Shan
    'si': 'sin_Sinh',  // Sinhala
    'sk': 'slk_Latn',  // Slovak
    'sl': 'slv_Latn',  // Slovenian
    'sm': 'smo_Latn',  // Samoan
    'sn': 'sna_Latn',  // Shona
    'sd': 'snd_Arab',  // Sindhi
    'so': 'som_Latn',  // Somali
    'st': 'sot_Latn',  // Southern Sotho
    'es': 'spa_Latn',  // Spanish
    'als': 'als_Latn',  // Albanian (Gheg)
    'srd': 'srd_Latn',  // Sardinian
    'sr': 'srp_Cyrl',  // Serbian
    'ss': 'ssw_Latn',  // Swati
    'su': 'sun_Latn',  // Sundanese
    'sv': 'swe_Latn',  // Swedish
    'sw': 'swh_Latn',  // Swahili
    'szl': 'szl_Latn',  // Silesian
    'ta': 'tam_Taml',  // Tamil
    'tt': 'tat_Cyrl',  // Tatar
    'te': 'tel_Telu',  // Telugu
    'tg': 'tgk_Cyrl',  // Tajik
    'tl': 'tgl_Latn',  // Tagalog
    'th': 'tha_Thai',  // Thai
    'ti': 'tir_Ethi',  // Tigrinya
    'taq': 'taq_Latn',  // Tamajaq
    'tpi': 'tpi_Latn',  // Tok Pisin
    'ts': 'tsn_Latn',  // Tswana
    'tn': 'tso_Latn',  // Tsonga
    'tk': 'tuk_Latn',  // Turkmen
    'tum': 'tum_Latn',  // Tumbuka
    'tr': 'tur_Latn',  // Turkish
    'tw': 'twi_Latn',  // Twi
    'tzm': 'tzm_Tfng',  // Tamazight
    'uig': 'uig_Arab',  // Uighur
    'uk': 'ukr_Cyrl',  // Ukrainian
    'umb': 'umb_Latn',  // Umbundu
    'ur': 'urd_Arab',  // Urdu
    'uz': 'uzn_Latn',  // Uzbek (Latin)
    'vec': 'vec_Latn',  // Venetian
    'vi': 'vie_Latn',  // Vietnamese
    'war': 'war_Latn',  // Waray
    'wo': 'wol_Latn',  // Wolof
    'xh': 'xho_Latn',  // Xhosa
    'yi': 'ydd_Hebr',  // Yiddish
    'yo': 'yor_Latn',  // Yoruba
    'yue': 'yue_Hant',  // Cantonese (Traditional)
    'zh': 'zho_Hans',  // Chinese (Simplified)
    'zho': 'zho_Hant',  // Chinese (Traditional)
    'zu': 'zul_Latn'   // Zulu
};

router.post('/translate-text', async (req, res) => {
    let translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
    try {
        console.log(req.body);
        const { text, targetLang } = req.body;

        if (!text || !targetLang) {
            return res.status(400).json({ error: 'Text and targetLang are required' });
        }

        // Detect the language of the input text
        const detectedLang = langdetect.detect(text)[0].lang;

        console.log(`Detected language: ${detectedLang}`);

        // Map detected language to model's language code
        const srcLang = langMap[detectedLang];
        const tgtLang = langMap[targetLang];

        if (!srcLang || !tgtLang) {
            return res.status(400).json({ error: 'Unsupported source or target language' });
        }

        // Translate the text
        const output = await translator(text, {
            src_lang: srcLang,
            tgt_lang: tgtLang,
        });

        res.json({ translatedText: output[0].translation_text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to translate text' });
    }
});

export default router;
