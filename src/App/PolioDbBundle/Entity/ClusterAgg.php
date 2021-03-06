<?php

namespace App\PolioDbBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * ClusterAgg
 *
 * @ORM\Table(name="cluster_agg")
 * @ORM\Entity(readOnly=true, repositoryClass="App\PolioDbBundle\Entity\ClusterAggRepository")
 */
class ClusterAgg
{

    /**
     * @var string
     *
     * @ORM\Column(name="Region", type="text", length=65535, nullable=true)
     */
    private $region;

    /**
     * @var string
     *
     * @ORM\Column(name="Province", type="text", length=65535, nullable=true)
     */
    private $province;

    /**
     * @var integer
     *
     * @ORM\Column(name="province_code", type="integer", nullable=true)
     */
    private $provinceCode;

    /**
     * @return int
     */
    public function getProvinceCode()
    {
        return $this->provinceCode;
    }

    /**
     * @var string
     *
     * @ORM\Column(name="District", type="text", length=65535, nullable=true)
     */
    private $district;

    /**
     * @var string
     *
     * @ORM\Column(name="Sub_District", type="text", length=65535, nullable=true)
     */
    private $subDistrict;

    /**
     * @return string
     */
    public function getSubDistrict()
    {
        return $this->subDistrict;
    }

    /**
     * @var string
     *
     * @ORM\Column(name="cluster", type="text", length=65535, nullable=true)
     */
    private $cluster;

    /**
     * @return string
     */
    public function getCluster()
    {
        return $this->cluster;
    }

    /**
     * @var string
     *
     * @ORM\Column(name="CampaignDate", type="text", length=65535, nullable=true)
     */
    private $campaignDate;

    /**
     * @var integer
     *
     * @ORM\Column(name="LPD_Status", type="integer", nullable=true)
     */
    private $lpd;

    /**
     * @var integer
     *
     * @ORM\Column(name="DCODE", type="integer", nullable=true)
     */
    private $dcode;

    /**
     * @var string
     *
     * @ORM\Column(name="C_Type", type="text", nullable=true)
     */
    private $cType;

    /**
     * @var integer
     *
     * @ORM\Column(name="Year", type="integer", nullable=true)
     */
    private $cYear;

    /**
     * @var string
     *
     * @ORM\Column(name="Month", type="text", nullable=true)
     */
    private $cMonth;

    /**
     * @var integer
     *
     * @ORM\Column(name="campaign_id", type="integer", nullable=true)
     */
    private $campaignId;

    /**
     * @return int
     */
    public function getCampaignId()
    {
        return $this->campaignId;
    }

    /**
     * @var integer
     *
     * @ORM\Column(name="Remaining_Absent", type="integer", nullable=true)
     */
    private $remainingAbsent;

    /**
     * @var integer
     *
     * @ORM\Column(name="Received_Vials", type="integer", nullable=true)
     */
    private $receivedVials;

    /**
     * @var integer
     *
     * @ORM\Column(name="Used_Vials", type="integer", nullable=true)
     */
    private $usedVials;

    /**
     * @var integer
     *
     * @ORM\Column(name="childs_0To11", type="integer", nullable=true)
     */
    private $child0To11;

    /**
     * @var integer
     *
     * @ORM\Column(name="childs_12To59", type="integer", nullable=true)
     */
    private $child12To59;

    /**
     * @var integer
     *
     * @ORM\Column(name="Reg_Absent", type="integer", nullable=true)
     */
    private $regAbsent;

    /**
     * @var integer
     *
     * @ORM\Column(name="Vacc_Absent", type="integer", nullable=true)
     */
    private $vaccAbsent;

    /**
     * @var integer
     *
     * @ORM\Column(name="Reg_Sleeps_NewBorn", type="integer", nullable=true)
     */
    private $regSleep;

    /**
     * @var integer
     *
     * @ORM\Column(name="Vacc_Sleeps_NewBorn", type="integer", nullable=true)
     */
    private $vaccSleep;

    /**
     * @var integer
     *
     * @ORM\Column(name="Remaining_Sleeps_NewBorn", type="integer", nullable=true)
     */
    private $remainingSleep;

    /**
     * @var integer
     *
     * @ORM\Column(name="Reg_refusals", type="integer", nullable=true)
     */
    private $regRefusal;

    /**
     * @return string
     */
    public function getCampaignDate()
    {
        return $this->campaignDate;
    }

    /**
     * @var integer
     *
     * @ORM\Column(name="Vacc_Refusals", type="integer", nullable=true)
     */
    private $vaccRefusal;

    /**
     * @var integer
     *
     * @ORM\Column(name="Remaining_Refusals", type="integer", nullable=true)
     */
    private $remainingRefusal;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     */
    private $id;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }


    public function getRegion()
    {
        return $this->region;
    }

    /**
     * @return string
     */
    public function getProvince()
    {
        return $this->province;
    }

    /**
     * @return string
     */
    public function getDistrict()
    {
        return $this->district;
    }

    /**
     * @return int
     */
    public function getLpd()
    {
        return $this->lpd;
    }

    /**
     * @return int
     */
    public function getDcode()
    {
        return $this->dcode;
    }

    /**
     * @return string
     */
    public function getCType()
    {
        return $this->cType;
    }

    /**
     * @return int
     */
    public function getCYear()
    {
        return $this->cYear;
    }

    /**
     * @return string
     */
    public function getCMonth()
    {
        return $this->cMonth;
    }

    /**
     * @return int
     */
    public function getRemainingAbsent()
    {
        return $this->remainingAbsent;
    }

    /**
     * @return int
     */
    public function getRemainingSleep()
    {
        return $this->remainingSleep;
    }

    /**
     * @return int
     */
    public function getRemainingRefusal()
    {
        return $this->remainingRefusal;
    }

    /**
     * @return int
     */
    public function getReceivedVials()
    {
        return $this->receivedVials;
    }

    /**
     * @return int
     */
    public function getUsedVials()
    {
        return $this->usedVials;
    }

    /**
     * @return int
     */
    public function getChild0To11()
    {
        return $this->child0To11;
    }

    /**
     * @return int
     */
    public function getChild12To59()
    {
        return $this->child12To59;
    }

    /**
     * @return int
     */
    public function getRegAbsent()
    {
        return $this->regAbsent;
    }

    /**
     * @return int
     */
    public function getVaccAbsent()
    {
        return $this->vaccAbsent;
    }

    /**
     * @return int
     */
    public function getRegSleep()
    {
        return $this->regSleep;
    }

    /**
     * @return int
     */
    public function getVaccSleep()
    {
        return $this->vaccSleep;
    }

    /**
     * @return int
     */
    public function getRegRefusal()
    {
        return $this->regRefusal;
    }

    /**
     * @return int
     */
    public function getVaccRefusal()
    {
        return $this->vaccRefusal;
    }




}
