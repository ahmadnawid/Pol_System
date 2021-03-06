<?php

namespace App\PolioDbBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * District
 *
 * @ORM\Table(name="district_data")
 * @ORM\Entity(readOnly=true, repositoryClass="App\PolioDbBundle\Entity\DistrictDataRepository")
 */
class DistrictData
{
    /**
     * @var string
     *
     * @ORM\Column(name="district_name", type="text", length=65535, nullable=true)
     */
    private $districtName;

    /**
     * @var string
     *
     * @ORM\Column(name="province_name", type="text", length=65535, nullable=true)
     */
    private $provinceName;

    /**
     * @var integer
     *
     * @ORM\Column(name="district_code", type="integer")
     * @ORM\Id
     */
    private $districtCode;

    /**
     * @var integer
     * @ORM\Column(name="province_code")
     */
    private $provinceCode;

    /**
     * @var integer
     * @ORM\Column(name="lpd_status")
     */
    private $lpdStatus;

    /**
     * @return int
     */
    public function getLpdStatus()
    {
        return $this->lpdStatus;
    }

    /**
     * Get districtName
     *
     * @return string
     */
    public function getDistrictName()
    {
        return $this->districtName;
    }

    /**
     * @return string
     */
    public function getProvinceName()
    {
        return $this->provinceName;
    }

    /**
     * Get districtCode
     *
     * @return integer
     */
    public function getDistrictCode()
    {
        return $this->districtCode;
    }


    /**
     * Get provinceCode
     *
     * @return integer
     */
    public function getProvinceCode()
    {
        return $this->provinceCode;
    }
}
