package com.it15000118.af.stock.restapi.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.it15000118.af.stock.restapi.Model.pharmacySystemModel;
import com.it15000118.af.stock.restapi.Repository.pharmacySystemRepository;

@RestController
@RequestMapping("/api/pharmacy/stock")
@CrossOrigin
public class pharmacySystemController {

	@Autowired
	pharmacySystemRepository objPSystemRepo;

	@Autowired
	MongoTemplate mongoTemplate;
	Date today = new Date();

	// GET all available drug stock details
	// ==========================================================================================
	@RequestMapping(method = RequestMethod.GET)
	public List<pharmacySystemModel> getAllDruckStock() {

		List<pharmacySystemModel> returnDrugList = new ArrayList<pharmacySystemModel>();

		List<String> drugList = mongoTemplate.getCollection("PharmacyStock").distinct("drugName");

		for (int i = 0; i < drugList.size(); i++) {
			pharmacySystemModel pharmacyModel = new pharmacySystemModel();
			pharmacyModel.setDrugName(drugList.get(i).toString());
			returnDrugList.add(pharmacyModel);

		}

		List<pharmacySystemModel> stockList = objPSystemRepo.findAll();
		for (int i = 0; i < returnDrugList.size(); i++) {

			Double qty = 0.0;
			boolean isChanged = false;
			pharmacySystemModel pharmacyModel = new pharmacySystemModel();

			for (int r = 0; r < stockList.size(); r++) {

				if (stockList.get(r).getDrugName().equals(returnDrugList.get(i).getDrugName()) &&

						stockList.get(r).getExpDate().compareTo(today) > 0) {

					qty = qty + Double.parseDouble(stockList.get(r).getDrugQuantity());

					if (!isChanged || Double.parseDouble(pharmacyModel.getDrugPrice()) < Double
							.parseDouble(stockList.get(r).getDrugPrice())) {

						isChanged = true;
						pharmacyModel.setDrugName(stockList.get(r).getDrugName());
						pharmacyModel.setDrugCategory(stockList.get(r).getDrugCategory());
						pharmacyModel.setDrugPrice(stockList.get(r).getDrugPrice());
						pharmacyModel.setDrugType(stockList.get(r).getDrugType());
						pharmacyModel.setExpDate(stockList.get(r).getExpDate());

					}

				}

			}
			pharmacyModel.setDrugQuantity(Double.toString(qty));
			returnDrugList.set(i, pharmacyModel);

		}

		return returnDrugList;

	}

	// ADD drugs to stock
	// ==========================================================================================
	@RequestMapping(method = RequestMethod.POST)
	public List<pharmacySystemModel> addNewStock(@RequestBody List<pharmacySystemModel> newPList) {

		return objPSystemRepo.save(newPList);

	}

	// Output drug quantity by accepting drugName as a paramter
	// ====================================================================
	@RequestMapping(value = "{drugName}", method = RequestMethod.GET)
	public Double valdiateDrugQuantity(@PathVariable("drugName") String drugName) {

		List<pharmacySystemModel> drugList = objPSystemRepo.findAll();

		Double drugQty = 0.0;
		for (int i = 0; i < drugList.size(); i++) {
			// || drugList.get(i).getExpDate().compareTo(today) == 0)
			if (drugList.get(i).getDrugName().equals(drugName) && drugList.get(i).getExpDate().compareTo(today) > 0) {

				drugQty = drugQty + Double.parseDouble(drugList.get(i).getDrugQuantity());
			}
		}

		return drugQty;

	}

	// Get all expired drugs in the stock
	// ==========================================================================================
	@RequestMapping(value = "/expiredStock", method = RequestMethod.GET)
	public List<pharmacySystemModel> getExpiredstock() {

		List<pharmacySystemModel> stockList = objPSystemRepo.findAll();
		List<pharmacySystemModel> returnExpiredList = new ArrayList<pharmacySystemModel>();
		for (int i = 0; i < stockList.size(); i++) {

			if (stockList.get(i).getExpDate().compareTo(today) < 0) {
				returnExpiredList.add(stockList.get(i));
			}

		}

		return returnExpiredList;

	}

	// Delete expired drugs from the stock
	// ==========================================================================================
	@RequestMapping(value = "/deleteExpiredStock/{ID}", method = RequestMethod.DELETE)
	public boolean deleteFromStock(@PathVariable("ID") String ID) {

		pharmacySystemModel A = objPSystemRepo.findOne(ID);
		if (A != null) {
			objPSystemRepo.delete(ID);
			return true;
		} else {
			return false;
		}

	}

	// Update stock details when dispense drugs (Nearest expire day first)
	// ================================================
	@RequestMapping(value = "/update/drug", method = RequestMethod.PUT)
	public boolean updateStock(@RequestBody pharmacySystemModel objPharmacyModel) {

		List<pharmacySystemModel> drugList = objPSystemRepo.findAll();
		Double Quantity = Double.parseDouble(objPharmacyModel.getDrugQuantity());
		String drugName = objPharmacyModel.getDrugName();

		Collections.sort(drugList, new Comparator<pharmacySystemModel>() {

			public int compare(pharmacySystemModel o1, pharmacySystemModel o2) {

				return Integer.valueOf(o1.getExpDate().compareTo(o2.getExpDate()));
			}

		});

		for (int i = 0; i < drugList.size(); i++) {

			if (drugList.get(i).getDrugName().equals(drugName) && drugList.get(i).getExpDate().compareTo(today) > 0) {

				if (Quantity <= Double.parseDouble(drugList.get(i).getDrugQuantity())) {

					Double value = Double.parseDouble(drugList.get(i).getDrugQuantity()) - Quantity;
					drugList.get(i).setDrugQuantity(value.toString());
					objPSystemRepo.save(drugList.get(i));
					return true;

				} else {
					Quantity = Quantity - Double.parseDouble(drugList.get(i).getDrugQuantity());
					drugList.get(i).setDrugQuantity("0.0");
					objPSystemRepo.save(drugList.get(i));

				}

			}

		}

		return true;
	}

	@RequestMapping(value = "{drugName}", method = RequestMethod.PUT)
	public boolean updateCurrentStock(@PathVariable("drugName") String drugName,
			@RequestBody pharmacySystemModel objPModel, HttpServletResponse response) {
		System.out.println(drugName);

		if (objPSystemRepo.findBydrugName(drugName) == null) {

			try {
				response.sendError(404, "INVALID DRUG NAME");
				return false;
			} catch (IOException e) {

				e.printStackTrace();
			}
		} else {

			String newDrugName = objPModel.getDrugName();
			List<pharmacySystemModel> drugList = objPSystemRepo.findAll();
			for (int i = 0; i < drugList.size(); i++) {

				if (drugList.get(i).getDrugName().equals(drugName)) {
					drugList.get(i).setDrugName(newDrugName);

					objPSystemRepo.save(drugList.get(i));

				}
			}

		}

		return true;
	}

}
